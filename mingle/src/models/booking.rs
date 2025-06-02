use std::{convert::TryFrom, time::SystemTime};

use super::{date_model::Date, owner::Owner};
use chrono::Utc;
use mongodb::bson::{DateTime, oid::ObjectId};
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct Booking {
    pub _id: ObjectId,
    pub owner: ObjectId,
    pub start_time: DateTime,
    pub duration_in_minutes: u8,
    pub cancelled: bool,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct BookinRequest {
    pub owner: String,
    pub start_time: String,
    pub duration_in_minutes: u8,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FullBooking {
    pub _id: ObjectId,
    pub owner: Owner,
    pub partner: Vec<Date>,
    pub start_time: DateTime,
    pub duration_in_minutes: u8,
    pub cancelled: bool,
}

impl TryFrom<BookinRequest> for Booking {
    type Error = Box<dyn std::error::Error>;

    fn try_from(value: BookinRequest) -> Result<Self, Self::Error> {
        let chrono_datetime: SystemTime = chrono::DateTime::parse_from_rfc3339(&value.start_time)
            .map_err(|err| format!("Failed to parse start time : {}", err))?
            .with_timezone(&Utc)
            .into();

        Ok(Self {
            _id: ObjectId::new(),
            owner: ObjectId::parse_str(&value.owner).expect("Failed to parse owner"),
            start_time: DateTime::from(chrono_datetime),
            duration_in_minutes: value.duration_in_minutes,
            cancelled: false,
        })
    }
}
