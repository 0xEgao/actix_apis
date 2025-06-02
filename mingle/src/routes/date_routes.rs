use crate::{
    models::date_model::{Date, DateRequest},
    services::db::Database,
};

use actix_web::{
    HttpResponse, post,
    web::{Data, Json},
};

#[post("/date")]
pub async fn create_date(db: Data<Database>, request: Json<DateRequest>) -> HttpResponse {
    match db
        .create_date(
            Date::try_from(DateRequest {
                owner: request.owner.clone(),
                name: request.name.clone(),
                age: request.age.clone(),
                gender: request.gender.clone(),
            })
            .expect("Error converting DateRequest to Date"),
        )
        .await
    {
        Ok(booking) => HttpResponse::Ok().json(booking),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}
