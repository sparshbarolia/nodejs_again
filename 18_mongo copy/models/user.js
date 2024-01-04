const mongoose = require("mongoose");


//SCHEMA
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,  //ye field add krna compulsary h
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,    //email should be unique
    },
    jobTitle: {
        type: String
    },
    gender:{
        type: String,
    }
    },
    {timestamps: true}  //har entry ke sath time stamp store hojaegi DB me
);

//                          MODEL
//sparshusers naam ka collection bn jaega MONGO BASICS DB me
const UserDB = mongoose.model("sparshuser",userSchema);

module.exports = UserDB;