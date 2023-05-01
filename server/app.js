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
const Registration = require("./models/userSchema");
const User = require("./models/userSchema");
const bcrypt = require('bcrypt');
const ADMIN_EMAIL = process.env.ADMIN_EMAIL

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

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

app.post("/signup", urlencodedParser, (req, res) => {
  const plaintextPassword = req.body.password
  req.body.password = bcrypt.hashSync(plaintextPassword, salt);
  const user = new Registration(req.body);
  userHelpers.doSignup(user).then((user)=>{
      let msg = user.institute_name + " has been registered for accreditation. Please check the dashboard for more details." 
      let msg2 = "Thank you for registering with our Accreditation Management Software application. We are thrilled to have you on board, and we look forward to helping you streamline your accreditation process. Feel free to explore our application and familiarize yourself with its features. If you have any questions or concerns, please do not hesitate to reach out to our support team at [vishnusureshperumbavor@gmail.com]. Thank you again for choosing our Accredify platform. We are committed to providing you with exceptional service and support." 
      adminHelpers.sendMailToAdmin(user,msg)   
      // adminHelpers.sendMailToUser(user,msg2)
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

app.post("/addDetails/:userId", urlencodedParser, (req, res) => {
  const userId = req.params.userId;
  const formData = req.body
  userHelpers.doAddDetails(formData,userId).then((user)=>{
      res.status(200).json({ user: user });
  })
  .catch((err)=>{
    console.log("failed");
      res.status(500).json("failed");
  })
});

app.post("/getInstitutionTypes", urlencodedParser, (req, res) => {
  // adminHelpers.getInstitutionTypes()
});

app.post("/getCollegeFinance", urlencodedParser, (req, res) => {
  adminHelpers.getCollegeFinance()
});
app.post("/getUserDetails", urlencodedParser, (req, res) => {
  userHelpers.getUserDetails(req.body.userId).then((user)=>{
      res.status(200).json({ user });
  })
  .catch((err)=>{
    res.status(500).json(err)
  })
});

// app.post("/getUserDetails/:userId", urlencodedParser, (req, res) => {
//   console.log("get user details")
//   const userId = req.params.userId;
//   userHelpers.getUserDetails(userId).then((user)=>{
//       res.status(200).json({ user: user });
//   })
//   .catch((err)=>{
//     console.log("failed");
//       res.status(500).json(err);
//   })
// });

app.post("/handlePayment", urlencodedParser, (req, res) => {
  adminHelpers.addPayments(req.body)
  userHelpers.generateRazorpay(req.body).then((response)=>{
    res.json(response)
  }).catch(()=>{
    res.json({onlineFailed:true})
  })
});

app.post("/handlePaymentSuccess", urlencodedParser, (req, res) => {
  let msg = req.body.username + " upgraded membership status and ensure that they receive all the benefits and features associated with their plan." 
  let user = {
    email : ADMIN_EMAIL
  }
  adminHelpers.sendMailToAdmin(user,msg)   
});



app.get('/api/checkEmail/:email', async (req, res) => {
  const { email } = req.params;
  const user = await userHelpers.checkEmail(email);
  if (user) {
    res.json({ exists: true });
  } else {
    res.json({ exists: false });
  }
});

app.get('/api/checkUsername/:username', async (req, res) => {
  const { username } = req.params;
  const user = await userHelpers.checkUsername(username);

  if (user) {
    res.json({ exists: true });
  } else {
    res.json({ exists: false });
  }
});


app.post("/login", urlencodedParser, (req, res) => {
  userHelpers.doLogin(req.body).then((user)=>{
      const token = jwt.sign({ user }, JWT_SECRET);
      res.status(200).json({ token, user: user });
  })
  .catch((err)=>{
      res.status(500).json("failed");
  })
});

app.post("/getAmount", urlencodedParser, (req, res) => {
  adminHelpers.getTotalAmount().then((amount)=>{
    res.status(200).json(amount)
  })
  .catch((err)=>{
      res.status(500).json("failed");
  })
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

app.post("/getUserTable",urlencodedParser,(req,res)=>{
  db.collection(collections.USER_DETAILS).find().sort({createdAt: -1}).toArray().then((users)=>{
    res.status(200).json({ users });
  }).catch((err)=>{
    res.status(500).json("failed");
  })
})

app.post("/getCollegeData",urlencodedParser,(req,res)=>{
  userHelpers.getUserDetails(req.body.userId.id).then((user)=>{
    res.status(200).json({ user: user });
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
