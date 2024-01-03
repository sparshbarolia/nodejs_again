const http = require("http");
const fs = require("fs");
const url = require("url");

//RUN THIS ON GOOGLE FOR THIS PROJECT
//http://localhost:8000/about?myName=sparsh&userId=69

const myHandler =  (req,res) => {
    //ye isliye h qki 2 request snd krta h server jisme ek ye hoti h 
    //isko htakr dekhle smjh jaega
    if(req.url == "/favicon.ico") return res.end();

    const log = `new request received at : ${Date.now()} on ${req.url}\n`;

    //true mtlb humko query parameter bhi parse krne h
    const myUrl = url.parse(req.url,true);
    console.log(myUrl);

    //file me append krne ke baad call back function run kro
    //fs.appendFile(<jis file me likhna> , <jo likhna> , <call back function>)
    fs.appendFile('log.txt' , log , (err,data) => {
        if(myUrl.pathname === "/"){
            res.end("Welcome to home page")
        }
        else if(myUrl.pathname === "/about"){
            // res.end("Welcome to about page")
            const userName = myUrl.query.myName;
            res.end(`Hi, ${userName}`);
        }
        else{
            res.end("404 NOT FOUND")
        }
    })
}

//server created
const myServer = http.createServer(myHandler);

//server is working at port 8000
//we can access it from localhost:8000
myServer.listen(8000 , () => {
    console.log("server is working at localhost:8000")
})