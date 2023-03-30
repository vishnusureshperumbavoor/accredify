const collections = require("../collections");
const mongoose = require("mongoose");
const db = mongoose.connection;

module.exports = {
    doRegistration:(user)=>{
        return new Promise(async(resolve,reject)=>{
            db.collection(collections.USER_REQUESTS).insertOne(user).then((data)=>{
                resolve(data)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    },
    doSignup:(user)=>{
        return new Promise(async(resolve,reject)=>{
            db.collection(collections.USERS).insertOne(user).then((data)=>{
                console.log("signup successfull")
                resolve(data)
            })
            .catch((err)=>{
                console.log("signup failed")
                reject(err)
            })
        })
    },
}