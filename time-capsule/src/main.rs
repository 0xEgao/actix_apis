use dotenv::dotenv;
use tokio::task;

pub mod config;
pub mod db;
pub mod dtos;
pub mod error;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();

    let conn_str = std::env::var("DATABASE_URL")?;

    task::spawn_blocking(move || {
        let mut db_client = db::DBClient::new(&conn_str).expect("Failed to connect");
        db_client
            .get_all_capsules()
            .expect("Failed to query capsules");
    })
    .await?;

    Ok(())
}
