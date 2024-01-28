const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
},{timestamps: true});

//mongo basics -> loginusers
const User = mongoose.model("loginuser",userSchema);

module.exports = User;