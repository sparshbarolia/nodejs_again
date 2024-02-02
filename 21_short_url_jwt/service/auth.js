const jwt = require('jsonwebtoken');
const secret = "sparsh@123"  //secret key for jwt

//tokens bnare
const setUser = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
    }
    //jwt sare user data se ek unique token bna dega
    //us token ko use krke vapas se user info mil skti
    //jwt token me hi sari info store hoti h
    return jwt.sign(payload , secret);
}

const getUser = (token) => {
    if(!token) return null;
    //secret key use krke verify krenge token ko
    //return krega payload jo token set krte wqt use kia tha
    return jwt.verify(token,secret);
}

module.exports = {
    setUser,
    getUser,
}