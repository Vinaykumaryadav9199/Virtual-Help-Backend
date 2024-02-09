const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true,
        

    },
    AcountCreatedAt:{
        type:Date,
        default:Date.now,

    }
})

const user =mongoose.model("user", userSchema)

module.exports = user