const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phoneNo:Number,
    location:String
})

const userAuthModel = mongoose.model("userAuthModel",userSchema)

module.exports = userAuthModel