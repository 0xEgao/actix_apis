use std::str::FromStr;
use std::time::SystemTime;
use std::{env, vec};

use chrono::Utc;
use futures_util::StreamExt;
use mongodb::bson::{DateTime, doc, extjson::de::Error, from_document, oid::ObjectId};
use mongodb::results::{InsertOneResult, UpdateResult};
use mongodb::{Client, Collection};

use crate::models::booking::{Booking, FullBooking};
use crate::models::date_model::Date;
use crate::models::owner::Owner;

pub struct Database {
    booking: Collection<Booking>,
    date: Collection<Date>,
    owner: Collection<Owner>,
}

impl Database {
    pub async fn init() -> Self {
        let uri = match env::var("MONGO_URI") {
            Ok(v) => v.to_string(),
            Err(_) => "mongodb://localhost:27017/?directConnection=true".to_string(),
        };

        let client = Client::with_uri_str(uri).await.unwrap();
        let db = client.database("date_hehe");

        let booking: Collection<Booking> = db.collection("booking");
        let date: Collection<Date> = db.collection("date");
        let owner: Collection<Owner> = db.collection("owner");

        Database {
            booking,
            date,
            owner,
        }
    }

    pub async fn create_owner(&self, owner: Owner) -> Result<InsertOneResult, Error> {
        let result = self
            .owner
            .insert_one(owner)
            .await
            .ok()
            .expect("Error creating owner");

        Ok(result)
    }

    pub async fn create_date(&self, date: Date) -> Result<InsertOneResult, Error> {
        let result = self
            .date
            .insert_one(date)
            .await
            .ok()
            .expect("Eror creating date");
        Ok(result)
    }

    pub async fn create_booking(&self, booking: Booking) -> Result<InsertOneResult, Error> {
        let result = self
            .booking
            .insert_one(booking)
            .await
            .ok()
            .expect("error creating booking");
        Ok(result)
    }

    pub async fn get_bookings(&self) -> Result<Vec<FullBooking>, Error> {
        let now: SystemTime = Utc::now().into();

        let mut results = self
            .booking
            .aggregate(vec![
                doc! {
                    "$match":{
                        "cancelled":false,
                        "start_time":{
                            "$gte":DateTime::from_system_time(now)
                        }
                    }
                },
                doc! {
                    "$lookup": doc! {
                        "from":"owner",
                        "localField":"owner",
                        "foreignField":"_id",
                        "as":"owner"
                    }
                },
                doc! {
                    "$lookup": doc! {
                        "from":"date",
                        "localField":"owner._id",
                        "foreignField":"owner",
                        "as":"date"
                    }
                },
            ])
            .await
            .ok()
            .expect("Error getting bookings");

        let mut bookings: Vec<FullBooking> = Vec::new();

        while let Some(results) = results.next().await {
            match results {
                Ok(d) => {
                    let booking: FullBooking =
                        from_document(d).expect("Error converting doc to Full booking");
                    bookings.push(booking);
                }
                Err(err) => panic!("Error getting booking {}", err),
            }
        }
        Ok(bookings)
    }

    pub async fn cancel_booking(&self, booking_id: &str) -> Result<UpdateResult, Error> {
        let result = self
            .booking
            .update_one(
                doc! {
                    "_id":ObjectId::from_str(booking_id).expect("Failed to get booking id")
                },
                doc! {
                    "$set":doc! {
                        "cancelled":"true"
                    }
                },
            )
            .await
            .ok()
            .expect("Error cancelling booking");

        Ok(result)
    }
}
