const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    institute_type: String,
    institute_name: String,
    affiliated_by: String,
    year_of_establishment: String,
    aishe_code: String,
    first_approval: String,
    postal_address: String,
    state: String,
    district: String,
    email: String,
    website: String,
    tan_pan_no: String,
    fax: String,
    mobile_no: String,
    phone: String,
    pin_code: String,
    status: String,
    createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("registration", registrationSchema)