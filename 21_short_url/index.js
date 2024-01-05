const express = require("express");

const {connectMongoDb} = require("./connection");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

//connecting to mongoDB(mongo basics -> urls)
connectMongoDb('mongodb+srv://admin:admin@cluster0.77usmop.mongodb.net/?retryWrites=true&w=majority');

//go to body of http://localhost:8001/url in post method in postman

// Middleware to handle JSON data
//add {"url": "https://sparshportfoliowebsite.netlify.app/"} in raw(JSON)
app.use(express.json()); 

// Middleware to handle URL-encoded data
//add key = url and value = https://sparshportfoliowebsite.netlify.app/ in body -> x-www-form-urlencoded
// app.use(express.urlencoded({extended : false}));

app.use("/url" , urlRoute);

app.get("/:shortId" , async(req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate( { shortId },
        {
            //$push is used to push in visitHistory array
            //it is a mongoDB operator for findOneAndUpdate or update
            $push: {visitHistory: {timestamp: Date.now()}}
        }
    )
    res.redirect(entry.redirectURL);
})

app.listen(PORT , () => [
    console.log(`server is running at localhost:${PORT}`)
])