const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then((res) => {
    console.log("mongodb connection established");
})
.catch((err) => {
    console.log(`error : ${err.message}`);
});

const db = mongoose.connection;
module.exports = db