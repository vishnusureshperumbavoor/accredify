const nodemailer = require("nodemailer")
const twilio = require('twilio');
const EMAIL = process.env.EMAIL 
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
const TWILIO_SID = process.env.TWILIO_SID 
const TWILIO_AUTHY = process.env.TWILIO_AUTHY
const client = twilio(TWILIO_SID, TWILIO_AUTHY);
const wbm = require('wbm');

module.exports = {
    sendMail:(user,msg)=>{
        return new Promise(async(resolve,reject)=>{
            let transporter = nodemailer.createTransport({
                service:'gmail',
                auth: {
                    user: EMAIL,
                    pass: EMAIL_PASSWORD
                },
              });
            
              let info = await transporter.sendMail({
                from: EMAIL, // sender address
                to: user.email, // list of receivers
                subject: "NBA Accreditation", // Subject line
                text: msg
              });
            
              console.log("Message sent: %s", info.messageId);
              console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
              resolve(info)
        })
    },
    sendWhatsApp:(user,msg)=>{
        return new Promise(async(resolve,reject)=>{
            client.messages
  .create({
     body: 'This is a test message',
     from: '+91 87142 67479', // Replace with your Twilio phone number
     to: '+917902963981' // Replace with your mobile phone number
   })
  .then(message => console.log(message.sid));
        })
    },

    sendSMS:()=>{
        return new Promise(async(resolve,reject)=>{

        })
    }
}