const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const collections = require("./collections");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");
const jwt = require("jsonwebtoken");
const adminHelpers = require("./helpers/adminhelpers")
const userHelpers = require("./helpers/userhelpers")
const CLIENT_URL = process.env.CLIENT_URL;
const db = require("./connection");
const Registration = require("./models/registrationSchema");
const User = require("./models/userSchema");
const web3helpers = require("./web3/web3.js")

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

app.post("/registration", urlencodedParser, (req, res) => {
  const user = new Registration(req.body);
  userHelpers.doRegistration(user).then((user)=>{
      let msg = "New member has been registered for accreditation. Please check the dashboard for more details."     
      let admin = {
        email:process.env.EMAIL,
        mobile:process.env.ADMIN_MOBILE
      } 
      // adminHelpers.sendMail(admin,msg)   
      // adminHelpers.sendWhatsApp(admin,msg)
      const token = jwt.sign({ user }, JWT_SECRET);
      console.log("successfully inserted");
      res.status(200).json({ token, user: user });
  })
  .catch((err)=>{
    console.log("failed");
      res.status(500).json("failed");
  })
});

app.post("/signup", urlencodedParser, async (req, res) => {
  const user = new User(req.body);
  await web3helpers.web3signup(user)
  // await userHelpers.doSignup(user).then((user)=>{
  //     // let msg = "Your username and password has been created. Now you can login to your account."     
  //     // adminHelpers.sendMail(admin,msg)   
  //     // adminHelpers.sendWhatsApp(admin,msg)
  //     const token = jwt.sign({ user }, JWT_SECRET);
  //     res.status(200).json({ token, user: user });
  // })
  // .catch((err)=>{
  //     res.status(500).json("failed");
  // })
});

app.post("/login", urlencodedParser, (req, res) => {
  db.collection(collections.USER_REQUESTS).findOne(
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

app.post("/adminLogin", urlencodedParser, (req, res) => {
  adminHelpers.adminLogin(req.body).then((user)=>{
    const token = jwt.sign({ user }, JWT_SECRET);
    console.log("Login successful");
    res.status(200).json({ token, user: user });
  }).catch((err)=>{
    console.log("Invalid password");
    res.status(500).json("failed");
  })
});

app.post("/pendingpage",urlencodedParser,(req,res)=>{
  db.collection(collections.USER_REQUESTS).find({status:"pending"}).toArray().then((users)=>{
    res.status(200).json({ users });
  }).catch((err)=>{
    res.status(500).json("failed");
  })
})
app.post("/approvedpage",urlencodedParser,(req,res)=>{
  db.collection(collections.USER_REQUESTS).find({status:"approved"}).toArray().then((users)=>{
    res.status(200).json({ users });
  }).catch((err)=>{
    res.status(500).json("failed");
  })
})

app.post("/rejectedpage",urlencodedParser,(req,res)=>{
  db.collection(collections.USER_REQUESTS).find({status:"rejected"}).toArray().then((users)=>{
    res.status(200).json({ users });
  }).catch((err)=>{
    res.status(500).json("failed");
  })
})

app.post('/approve', (req, res) => {
  adminHelpers.approveRequest(req.body).then((user)=>{
      let msg = "Congratz your institution has been approved for NBA Accreditation. Now check the website to create username and password"
      console.log("approved");
      // adminHelpers.sendMail(req.body,msg)   
      // adminHelpers.sendWhatsApp(req.body,msg)
      res.status(200).json(user);
    })
    .catch((err)=>{
      console.log("approval error");
      res.status(500).send('Server Error');
  })
});


app.post('/reject', async (req, res) => {
  adminHelpers.rejectRequest(req.body).then((user)=>{
      console.log("rejection success");
      let msg = "Your institution is not eligible for NBA Accreditation"
      //adminHelpers.sendMail(req.body,msg)
      //adminHelpers.sendWhatsApp(req.body,msg)
      res.status(200).json(user);
    })
    .catch((err)=>{
      console.log("rejection error");
      res.status(500).send('Server Error');
    })
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

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
