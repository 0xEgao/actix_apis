use actix_web::{App, HttpResponse, HttpServer, Responder, get, web::Data};

pub mod models;
pub mod routes;
pub mod services;

use routes::{
    booking_routes::{cancel_booking, create_booking, get_bookings},
    date_routes::create_date,
    owner_routes::create_owner,
};

use services::db::Database;

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello from actix web")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let db = Database::init().await;
    let db_data = Data::new(db);

    HttpServer::new(move || {
        App::new()
            .app_data(db_data.clone())
            .service(hello)
            .service(create_owner)
            .service(create_date)
            .service(create_booking)
            .service(get_bookings)
            .service(cancel_booking)
    })
    .bind(("localhost", 5001))?
    .run()
    .await
}
