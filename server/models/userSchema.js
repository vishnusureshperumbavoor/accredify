const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("user", userSchema)