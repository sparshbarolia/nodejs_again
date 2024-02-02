const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/" , async (req,res) => {
    //req.user and req.user._id are coming from 
    //auth.js -> checkAuth
    //ye hume current cookie se user uthakr dedega
    if(!req.user) return res.redirect('/login');

    //current user ke sare routes dikhane h is se
    const allurls = await URL.find({createdBy: req.user._id});

    res.render('home' , {urls : allurls});
})

router.get("/signup" , (req,res) => {
    return res.render('signup');
})
router.get("/login" , (req,res) => {
    return res.render('login');
})



module.exports = router;