use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};
use std::convert::TryFrom;

#[derive(Debug, Deserialize, Serialize)]
pub struct Owner {
    pub _id: ObjectId,
    pub name: String,
    pub email: Option<String>,
    pub phone: String,
    pub address: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct OwnerRequest {
    pub name: String,
    pub email: Option<String>,
    pub phone: String,
    pub address: String,
}

impl TryFrom<OwnerRequest> for Owner {
    type Error = Box<dyn std::error::Error>;

    fn try_from(value: OwnerRequest) -> Result<Self, Self::Error> {
        Ok(Self {
            _id: ObjectId::new(),
            name: value.name,
            email: value.email,
            phone: value.phone,
            address: value.address,
        })
    }
}
