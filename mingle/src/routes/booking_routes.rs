use crate::{
    models::booking::{BookinRequest, Booking},
    services::db::Database,
};

use actix_web::{
    HttpResponse, get, post, put,
    web::{self, Data, Json},
};

#[post("/booking")]
pub async fn create_booking(db: Data<Database>, request: Json<BookinRequest>) -> HttpResponse {
    match db
        .create_booking(
            Booking::try_from(BookinRequest {
                owner: request.owner.clone(),
                start_time: request.start_time.clone(),
                duration_in_minutes: request.duration_in_minutes.clone(),
            })
            .expect("Error converting booking request to booking"),
        )
        .await
    {
        Ok(booking) => HttpResponse::Ok().json(booking),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[get("/bookings")]
pub async fn get_bookings(db: Data<Database>) -> HttpResponse {
    match db.get_bookings().await {
        Ok(bookings) => HttpResponse::Ok().json(bookings),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[put("/booking/{id}/cancel")]
pub async fn cancel_booking(db: Data<Database>, path: web::Path<String>) -> HttpResponse {
    let id = path.into_inner();

    match db.cancel_booking(id.as_str()).await {
        Ok(result) => HttpResponse::Ok().json(result),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}
