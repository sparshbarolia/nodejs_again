const express = require("express");
const path = require("path");
const URL = require("./models/url")

const {connectMongoDb} = require("./connection");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter")

const app = express();
const PORT = 8001;

//connecting to mongoDB(mongo basics -> urls)
connectMongoDb('mongodb+srv://admin:admin@cluster0.77usmop.mongodb.net/?retryWrites=true&w=majority');

app.set("view engine" , "ejs");
//is line se hum btare h ki hmari ejs file views folder me h
//is line ki yaha jarurat nhi qki hmare folder ka naam views h
//jis se nodejs apne aap smjh jaega ki ejs files isme h
app.set("views" , path.resolve("./views")) 


// Middleware to handle JSON data
//add {"url": "https://sparshportfoliowebsite.netlify.app/"} in raw(JSON)
app.use(express.json()); 
app.use(express.urlencoded({extended: false})); //hum json ya form data,dono support krte h

// Middleware to handle URL-encoded data
//add key = url and value = https://sparshportfoliowebsite.netlify.app/ in body -> x-www-form-urlencoded
// app.use(express.urlencoded({extended : false}));

app.use("/" , staticRoute);  //agr kuchh /    se shuru horha ho to ye use kro
app.use("/url" , urlRoute);  //agr kuchh /url se start horha ho to ye use kro

app.listen(PORT , () => [
    console.log(`server is running at localhost:${PORT}`)
])