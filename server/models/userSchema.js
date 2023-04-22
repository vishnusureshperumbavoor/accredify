const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    institute_name: String,
    email: String,
    password:String,
    username:String,
    collegeDetails:Object,
    createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("registration", registrationSchema)