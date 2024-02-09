const mongoose = require('mongoose');

const userVerificationschema = new mongoose.Schema({
    Email:{
        type:String,
        required:true
    },
    OTP:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60 * 5
    }
})
 const userVerification=mongoose.model('userverification' , userVerificationschema)

module.exports = userVerification