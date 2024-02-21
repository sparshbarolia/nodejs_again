const {Router} = require("express");
const User = require('../models/user');

const router = Router();

router.get("/signin",(req,res) => {
    res.render("signin");
});

router.get("/signup",(req,res) => {
    res.render("signup");
});

router.post("/signin",async(req,res) => {
    const {email , password} = req.body;

    //matchPassword is defined in models->user.js
    const userData = await User.matchPassword(email,password);

    console.log("User",userData);
    return res.redirect("/");
});

router.post("/signup" , async(req,res) => {
    const {fullName , email , password} = req.body;

    //model->user.js me jakr dekh
    //password ko hash krke save kr rhe h databse me
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
})

module.exports = router;