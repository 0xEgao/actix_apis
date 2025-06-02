use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};
use std::convert::TryFrom;

#[derive(Debug, Deserialize, Serialize)]
pub struct Date {
    pub _id: ObjectId,
    pub owner: ObjectId,
    pub name: String,
    pub age: Option<u8>,
    pub gender: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DateRequest {
    pub owner: String,
    pub name: String,
    pub age: Option<u8>,
    pub gender: Option<String>,
}

impl TryFrom<DateRequest> for Date {
    type Error = Box<dyn std::error::Error>;

    fn try_from(req: DateRequest) -> Result<Self, Self::Error> {
        Ok(Self {
            _id: ObjectId::new(),
            owner: ObjectId::parse_str(&req.owner).expect("Failed to parse owner"),
            name: req.name,
            age: req.age,
            gender: req.gender,
        })
    }
}
