use actix_web::{App, HttpResponse, HttpServer, Responder, get};

pub mod models;
pub mod routes;
pub mod services;
#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello from actix web")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(hellofromsarthak))
        .bind(("localhost", 5001))?
        .run()
        .await
}

#[get("/sarthak")]
async fn hellofromsarthak() -> impl Responder {
    HttpResponse::Ok().body("Hello from Sarthak")
}
