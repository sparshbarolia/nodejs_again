const shortid = require("shortid");
const URL = require('../models/url');

const handleGenerateNewShortURL = async (req,res) => {
    const body = req.body;

    if(!body.url) return res.status(400).json({ "error": "url is required"});

    //npm package that generates short id of len 8
    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        //req.user._id came from middlewares->auth.js
        //is se current user ko bs uske dwara created shorturl hi dikhenge
        //sbke nhi dikhenge ab use shorturl
        createdBy: req.user._id, 
    });

    // return res.json({id : shortID});
    return res.render('home',{id: shortID})  //id ko home page me locals.id naam se use kr skte
}

const handleGetAnalytics = async (req,res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

const handleGetRedirectURL = async(req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate( { shortId },
        {
            //$push is used to push in visitHistory array
            //it is a mongoDB operator for findOneAndUpdate or update
            $push: {visitHistory: {timestamp: Date.now()}}
        }
    )

    if (entry && entry.redirectURL) {
        res.redirect(entry.redirectURL);
    } else {
        // Handle the case when entry is not found or redirectURL is not available
        res.status(404).send("URL not found");
    }
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleGetRedirectURL,
}