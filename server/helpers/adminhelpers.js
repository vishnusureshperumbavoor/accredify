const nodemailer = require("nodemailer")
const twilio = require('twilio');
const EMAIL = process.env.EMAIL 
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

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
            
        })
    }
}