const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');    //for generating user id
const {setUser , getUser} = require('../service/auth')

const handleUserSignup = async(req,res) => {
    //ye body.name , body.email , body.password
    //ye sb humne signup.ejs me form me define kia h
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    //              OR
    // const {name,email,password} = req.body;

    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}

const handleUserLogin = async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    const currUser = await User.findOne({email , password});

    if(!currUser){
        return res.render("login" , {
            error: "Invalid Username or Pasword",
        });
    }

    const token = setUser(currUser); 
    res.cookie("uid",token);
    
    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}