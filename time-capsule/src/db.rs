use openssl::ssl::{SslConnector, SslMethod};
use postgres::Client;
use postgres_openssl::MakeTlsConnector;
use std::error::Error;

pub struct DBClient {
    pub client: Client,
}

impl DBClient {
    pub fn new(conn_str: &str) -> Result<Self, Box<dyn Error>> {
        let builder = SslConnector::builder(SslMethod::tls())?;
        let connector = MakeTlsConnector::new(builder.build());

        let client = Client::connect(conn_str, connector)?;
        Ok(DBClient { client })
    }
    pub fn create_capsule(
        &mut self,
        name: &str,
        email: &str,
        title: &str,
        message: &str,
        unlock_at: chrono::DateTime<chrono::Utc>,
        public_id: &str,
    ) -> Result<(), Box<dyn Error>> {
        self.client.execute(
            "INSERT INTO capsules (public_id, name, email, title, message, unlock_at) VALUES ($1, $2, $3, $4, $5, $6)",
            &[
                &public_id,
                &name,
                &email,
                &title,
                &message,
                &unlock_at,
            ],
        )?;

        println!("Inserted test capsule.");
        Ok(())
    }

    pub fn get_all_capsules(&mut self) -> Result<(), Box<dyn Error>> {
        for row in self
            .client
            .query("SELECT public_id, name, email FROM capsules", &[])?
        {
            let public_id: &str = row.get(0);
            let name: &str = row.get(1);
            let email: &str = row.get(2);
            println!("- {} by {} <{}>", public_id, name, email);
        }
        Ok(())
    }
}
