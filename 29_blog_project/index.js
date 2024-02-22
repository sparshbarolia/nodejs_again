const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require('./models/blog');

const userRoute = require("./routes/user"); 
const blogRoute = require("./routes/blog");

const app = express();
const PORT = 8000;

mongoose.connect('mongodb+srv://sparshbarolia:admin@cluster0.q3y2mg7.mongodb.net/')
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("Mongo Error" , err));

//ye hum btare ki ejs files views folder me h
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//To handle form data
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());  //middleware for cookies
//hmara bnaya hua middleware,har request pr token naam ki cookie check krega
app.use(checkForAuthenticationCookie("token"))  
//ye img ko public folder se uthane keliye
app.use(express.static(path.resolve('./public')))  

app.get('/', async (req,res) => {
    const allBlogs = await Blog.find({});
    res.render('home',{
        user: req.user,
        blogs: allBlogs,
    });
})

app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(PORT , () => console.log(`server started at http://localhost:${PORT}`));
