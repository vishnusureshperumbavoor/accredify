const express = require("express");
const app = express();
const MONGOOSE = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MONGO_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const collections = require("./collections");

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");
const jwt = require("jsonwebtoken");
const CLIENT_URL = process.env.CLIENT_URL;

app.use(
  cors({
    origin: [CLIENT_URL],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.set("view engine", "hbs");
app.set("views", "");

MONGOOSE.set("strictQuery", false);
MONGOOSE.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((res) => {
    console.log("mongodb connection established");
  })
  .catch((err) => {
    console.log(`error : ${err.message}`);
  });

const userSchema = new MONGOOSE.Schema({
  userrole: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: new Date() },
});

const User = MONGOOSE.model("User", userSchema);

const db = MONGOOSE.connection;
app.post("/signup", urlencodedParser, (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  // db.collection(collections.USER_COLLECTIONS).insertOne(user, (err, coll) => {
  //   if (err) {
  //     console.log(`error ${err}`);
  //     res.status(500).json("failed");
  //   } else {
  //     const token = jwt.sign({ user }, JWT_SECRET);
  //     console.log("successfully inserted");
  //     res.status(200).json({ token, user: user });
  //   }
  // });
});

app.post("/login", urlencodedParser, (req, res) => {
  db.collection(collections.USER_COLLECTIONS).findOne(
    { username: req.body.username },
    (err, user) => {
      if (user && user.password === req.body.password) {
        const token = jwt.sign({ user }, JWT_SECRET);
        console.log("Login successful");
        res.status(200).json({ token, user: user });
      } else {
        console.log("Invalid password");
        res.status(500).json("failed");
      }
    }
  );
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.redirect("/login");
    }
  });
});

app.post("/countries", (req, res) => {
  let states = [
    { state_id: 1, state_name: "Andaman and Nicobar Islands" },
    { state_id: 2, state_name: "Andhra Pradesh" },
    { state_id: 3, state_name: "Arunachal Pradesh" },
    { state_id: 4, state_name: "Assam" },
    { state_id: 5, state_name: "Bihar" },
    { state_id: 6, state_name: "Chandigarh" },
    { state_id: 7, state_name: "Chhattisgarh" },
    { state_id: 8, state_name: "Dadra and Nagar Haveli" },
    { state_id: 37, state_name: "Daman and Diu" },
    { state_id: 9, state_name: "Delhi" },
    { state_id: 10, state_name: "Goa" },
    { state_id: 11, state_name: "Gujarat" },
    { state_id: 12, state_name: "Haryana" },
    { state_id: 13, state_name: "Himachal Pradesh" },
    { state_id: 14, state_name: "Jammu and Kashmir" },
    { state_id: 15, state_name: "Jharkhand" },
    { state_id: 16, state_name: "Karnataka" },
    { state_id: 17, state_name: "Kerala" },
    { state_id: 18, state_name: "Ladakh" },
    { state_id: 19, state_name: "Lakshadweep" },
    { state_id: 20, state_name: "Madhya Pradesh" },
    { state_id: 21, state_name: "Maharashtra" },
    { state_id: 22, state_name: "Manipur" },
    { state_id: 23, state_name: "Meghalaya" },
    { state_id: 24, state_name: "Mizoram" },
    { state_id: 25, state_name: "Nagaland" },
    { state_id: 26, state_name: "Odisha" },
    { state_id: 27, state_name: "Puducherry" },
    { state_id: 28, state_name: "Punjab" },
    { state_id: 29, state_name: "Rajasthan" },
    { state_id: 30, state_name: "Sikkim" },
    { state_id: 31, state_name: "Tamil Nadu" },
    { state_id: 32, state_name: "Telangana" },
    { state_id: 33, state_name: "Tripura" },
    { state_id: 34, state_name: "Uttar Pradesh" },
    { state_id: 35, state_name: "Uttarakhand" },
    { state_id: 36, state_name: "West Bengal" },
  ];
  console.log("api call worked")
  res.status(200).json({ states });
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
