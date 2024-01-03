//isko bhi import krne ki jarurat nhi
// const http  = require("http");
const express = require("express");

//RUN THIS ON GOOGLE FOR THIS PROJECT
//http://localhost:8000/about?myName=sparsh&userId=69

const app = express();

app.get("/" , (req,res) => {
    //agr json data send krna h to res.json se snd krte h
    return res.send("RAM RAM from Home pg");
})

app.get("/about" , (req,res) => {
    return res.send("RAM RAM from About pg " + "to " + req.query.myName);
})

// const myServer = http.createServer(app);

// myServer.listen(8000 , () => {
//     console.log("Server is working at localhost:8000");
// })
//                          OR
app.listen(8000,() => {
    console.log("Server is working at localhost:8000");
})