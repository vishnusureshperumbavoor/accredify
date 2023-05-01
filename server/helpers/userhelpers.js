const collections = require("../collections");
const mongoose = require("mongoose");
const db = mongoose.connection;
const bcrypt = require('bcrypt');
const UserSchema = require('../models/userSchema')
const ObjectId = mongoose.Types.ObjectId;
const Razorpay = require('razorpay');
const { ConversationListInstance } = require("twilio/lib/rest/conversations/v1/conversation");
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
var instance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
});


module.exports = {
    doSignup:(user)=>{
        console.log(user)
        return new Promise(async(resolve,reject)=>{
            db.collection(collections.USER_DETAILS).insertOne(user).then((data)=>{
                resolve(user)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    },
    checkEmail:(email)=>{
        return new Promise(async(resolve,reject)=>{
            db.collection(collections.USER_DETAILS).findOne({ email }).then((data)=>{
                resolve(data)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    },
    checkUsername:(username)=>{
        return new Promise(async(resolve,reject)=>{
            db.collection(collections.USER_DETAILS).findOne({ username }).then((data)=>{
                resolve(data)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    },
    doLogin:(user)=>{
        return new Promise(async(resolve,reject)=>{
            db.collection(collections.USER_DETAILS).findOne({
                $or: [{ username: user.username_or_email }, { email: user.username_or_email }]
            })
            .then((data)=>{
                if (data) {
                    bcrypt.compare(user.password, data.password, (err, isMatch) => {
                      if (err) {
                        reject(err);
                      } else if (isMatch) {
                        resolve(data);
                    } else {
                        reject("Invalid Password");
                      }
                    });
                  } else {
                    reject("User not found");
                  }
            })
            .catch((err)=>{
                reject(err)
            })
        })
    },
    doAddDetails:(data,userId)=>{
        return new Promise(async (resolve, reject) => {
            db.collection(collections.USER_DETAILS).updateOne({ _id: ObjectId(userId) },
                { 
                    $set: { details : data } 
                }
            ).then((user)=>{
                console.log("added new details")
                resolve(user)
            })
            .catch((err)=>{
                console.log("error adding")
                reject(err)
            })
        });
    },
    // getUserDetails:(userId)=>{
    //     return new Promise(async(resolve,reject)=>{
    //         let user = db.collection(collections.USER_DETAILS).findOne({_id:ObjectId(userId)})
    //         if(user){
    //             console.log("user exist")
    //             resolve(user)
    //         }else{
    //             console.log("user does not exist")
    //             reject(err)
    //         }
    //     })
    // },
    generateRazorpay:(user)=>{
        return new Promise((resolve,reject)=>{
            instance.orders.create({
                amount: user.price*100,
                    currency: "INR",
                    receipt: user.userId,
                  },(err,response)=>{
                      if(err){
                          console.log(err);
                          reject(err);
                      }else{
                          console.log(response);
                          resolve(response)
                        }
                    })
            
        })
    },
    verifyPayment:(details)=>{
        return new Promise((resolve,reject)=>{
            hmac.update(details['payment[razorpay_order_id]'] + '|' + details['payment[razorpay_payment_id]'])
            hmac=hmac.digest('hex')
            if(hmac==details['payment[razorpay_signature]']){
                resolve()
            }else{
                reject()
            }
        })
    },
    getUserDetails:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let user2 = await db.collection(collections.USER_DETAILS).findOne({_id:ObjectId(userId)})
            if(user2){
                resolve(user2)
            }
            else{
                console.log("user does not exist");
                reject(err)
            }
        })
    },
}