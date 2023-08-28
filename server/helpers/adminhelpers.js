const nodemailer = require("nodemailer")
const EMAIL = process.env.EMAIL 
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
// const { Client, LocalAuth } = require('whatsapp-web.js');
const collections = require("../collections");
const MONGOOSE = require("mongoose");
const ObjectId = MONGOOSE.Types.ObjectId;
const { collection } = require("../models/userSchema");
const db = MONGOOSE.connection;
const ADMIN_ID = process.env.ADMIN_ID

// const qrcode = require('qrcode-terminal');
// const client = new Client({
//     authStrategy: new LocalAuth()
// });

// client.on('qr', (qr) => {
//     qrcode.generate(qr, {small: true});
// });

// client.on('ready',async () => {
//     console.log('Whatapp automation is ready');
// });

// client.initialize();

module.exports = {
    adminLogin:(user)=>{
        return new Promise(async(resolve,reject)=>{
            db.collection(collections.ADMIN_LOGIN).findOne({name:user.adminName}).then((data)=>{
                if(data && data.password === user.password){
                    resolve(data)
                }else{
                    reject("Invalid Password")
                }
            })
            .catch((err)=>{
                reject(err)
            })
        })
    },
    approveRequest:(data)=>{
        return new Promise(async(resolve,reject)=>{
            id = MONGOOSE.Types.ObjectId(data._id);
            db.collection(collections.USER_REQUESTS).updateOne({_id: id},{$set:{status:"approved"}}).then((data)=>{
                resolve(data)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    },
    rejectRequest:(data)=>{
        return new Promise(async(resolve,reject)=>{
            id = MONGOOSE.Types.ObjectId(data._id);
            db.collection(collections.USER_REQUESTS).updateOne({_id: id},{$set:{status:"rejected"}}).then((data)=>{
                resolve(data)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    },
    sendMailToAdmin:(user,msg)=>{
        return new Promise(async(resolve,reject)=>{
            let transporter = nodemailer.createTransport({
                service:'gmail',
                auth: {
                    user: EMAIL,
                    pass: EMAIL_PASSWORD
                },
              });
              let info = await transporter.sendMail({
                from: user.email, // sender address
                to: EMAIL, // list of receivers
                subject: "NBA Accreditation", // Subject line
                text: msg
              });
            
              console.log("Message sent: %s", info.messageId);
              console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
              resolve(info)
        })
    },
    sendMailToUser:(user,msg)=>{
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
            const number = process.env.ADMIN_MOBILE
            const sanitized_number = number.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
            const final_number = `91${sanitized_number.substring(sanitized_number.length - 10)}`; // add 91 before the number here 91 is country code of India
            const number_details = await client.getNumberId(final_number);
            if (number_details) {
                await client.sendMessage(number_details._serialized, msg); 
            } else {
                console.log(final_number, "Mobile number is not registered on whatsapp");
            }
        })
    },

    sendSMS:()=>{
        return new Promise(async(resolve,reject)=>{

        })
    },
    getInstitutionTypes:(()=>{
        return new Promise((resolve,reject)=>{
            try {
                const institutionCounts = db.collection(collections.USER_DETAILS).aggregate([
                //   {
                //     $group: {
                //       institutionType: '$collegeDetails.general.institutionType',
                //       count: { $sum: 1 }
                //     }
                //   }
                { $unwind: "$collegeDetails.general" },
  { $group: { _id: "$collegeDetails.general.institutionType", count: { $sum: 1 } } }
                ])
                console.log(institutionCounts)
                // res.json(institutionCounts);
                resolve(institutionCounts);
              } catch (err) {
                console.error(err);
                // res.status(500).send('Server error');
                reject('Server error');
              }
        })
    }),
    getCollegeFinance:(()=>{
        return new Promise((resolve,reject)=>{
            
        })
    }),
    addPayments:((user)=>{
        return new Promise((resolve,reject)=>{
            db.collection(collections.ADMIN_LOGIN).findOne({_id:ObjectId(ADMIN_ID)}).then((admin)=>{
                console.log(admin)
                admin.payments = parseInt(admin.payments) + parseInt(user.price)
                db.collection(collections.ADMIN_LOGIN).updateOne({_id: admin._id},{$set:{payments:admin.payments}}).then((data)=>{
                    resolve(data)
                })
                .catch((err)=>{
                    reject(err)
                })
                
            })
        })
    }),
    getTotalAmount:(()=>{
        return new Promise((resolve,reject)=>{
            db.collection(collections.ADMIN_LOGIN).findOne({_id:ObjectId(ADMIN_ID)}).then((admin)=>{
                resolve(admin.payments)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }),
    getPaymentsTable:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let user = await db.collection(collections.PAYMENT_DETAILS).find().sort({date: -1}).toArray()
            if(user){
                resolve(user)
            }
            else{
                console.log("user does not exist");
                reject(err)
            }
        })
    },
}