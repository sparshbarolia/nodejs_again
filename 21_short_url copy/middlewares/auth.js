const {getUser} = require("../service/auth")

const resrtrictToLoggedinUserOnly = async(req,res,next) => {
    //cookie tbhi generate hogi,jb login kia hoga
    //isliye /url vale routes tbhi khulenge jb logged in honge hum
    const userUid = req.cookies?.uid;  //ye value cookies se milegi

    if(!userUid) return res.redirect("/login");

    const user = getUser(userUid);
    if(!user) return res.redirect("/login");

    //used while generating new link
    //to know kisne generate kia h link(current logged in user)
    req.user = user;  

    next();
}

const checkAuth = async(req,res,next) => {
    //cookie tbhi generate hogi,jb login kia hoga
    const userUid = req.cookies?.uid;  //ye value cookies se milegi

    const user = getUser(userUid);

    req.user = user;  

    next();
}

module.exports = {
    resrtrictToLoggedinUserOnly,
    checkAuth,
}