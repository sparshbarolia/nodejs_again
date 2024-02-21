const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const userRoute = require("./routes/user") 

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

app.get('/',(req,res) => {
    res.render('home');
})
app.use('/user',userRoute);

app.listen(PORT , () => console.log(`server started at http://localhost:${PORT}`));
