const collections = require("../collections");
const mongoose = require("mongoose");
const db = mongoose.connection;
const bcrypt = require('bcrypt');
const UserSchema = require('../models/userSchema')
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    doSignup:(user)=>{
        return new Promise(async(resolve,reject)=>{
            console.log(user)
            db.collection(collections.USER_DETAILS).insertOne(user).then((data)=>{
                resolve(data)
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
    doAddDetails:(data,user)=>{
        console.log(user);
        return new Promise(async (resolve, reject) => {
            db.collection(collections.USER_DETAILS).findOneAndUpdate(
                { _id: user },
                { $set: { 
                    collegeDetails: data
                } },
                { new: true },
                (err, doc) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log('College details saved to database.');
                        resolve(doc);
                    }
                }
            );
  });
    },
}