const {getUser} = require("../service/auth")

const resrtrictToLoggedinUserOnly = async(req,res,next) => {
    //cookie tbhi generate hogi,jb login kia hoga
    //isliye /url vale routes tbhi khulenge jb logged in honge hum
    const userToken = req.cookies?.uid;  //ye value cookies se milegi

    if(!userToken) return res.redirect("/login");

    const user = getUser(userToken);
    if(!user) return res.redirect("/login");

    //used while generating new link
    //to know kisne generate kia h link(current logged in user)
    //req.user ki value set krdi taki aage ke functions ise use kr paye
    //is case me controllers -> url.js -> handleGenerateNewShortURL me use horha h ye
    req.user = user;  

    next();
}

const checkAuth = async(req,res,next) => {
    //cookie tbhi generate hogi,jb login kia hoga
    const userToken = req.cookies?.uid;  //ye value cookies se milegi

    const user = getUser(userToken);

    req.user = user;  

    next();
}

module.exports = {
    resrtrictToLoggedinUserOnly,
    checkAuth,
}