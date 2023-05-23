const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    institute_name: String,
    department:String,
    email: String,
    password:String,
    username:String,
    timeStamp:Date,
    collegeDetails:Object,
    createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("registration", registrationSchema)