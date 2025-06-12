#[derive(Debug, Clone)]
pub struct Config {
    pub database_url: String,
}

impl Config {
    pub fn init() -> Self {
        let db_url = std::env::var("DATABASE_URL").expect("unable to get database url");

        Config {
            database_url: db_url,
        }
    }
}
