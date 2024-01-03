const express = require("express")
const fs = require("fs")
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json")

const app = express();
const PORT = 8000;

//connecting to DB
mongoose.connect('mongodb+srv://admin:admin@cluster0.77usmop.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("Mongo Error" , err));


//SCHEMA
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,  //ye field add krna compulsary h
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,    //email should be unique
    },
    jobTitle: {
        type: String
    },
    gender:{
        type: String,
    }
})

//MODEL
//sparshusers naam ka DB bn jaega MONGO BASICS collection me
const User = mongoose.model("sparshuser",userSchema);

                            //MIDDLEWARES

//built in middleware
//form data ko body me dalega(post request ke liye use kia h)
app.use(express.urlencoded({extended : false}));

//CUSTOM MIDDLE WARE
app.use((req,res,next) => {
    res.setHeader("X-MyName","sparsh")
    console.log("Hello from 1st custom middleware");
    next();    //to call next middleware(server if no middleware are left)
})

app.use((req, res, next) => {
    //append file then call next
    fs.appendFile("./log.txt", `\n${Date.now()}:${req.method} ${req.path}`, (err, data) => {
        next();
    })
})

//ROUTES

app.get("/users" , (req,res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li> ${user.first_name} </li>`).join("")}
    </ul>
    `;
    res.send(html);
})

app.get("/api/users" , (req,res) => {
    //json data h to res.json likha
    return res.json(users);
})


app.get("/api/users/:id" , (req,res) => {
    //extract id
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})

app.post("/api/users" , (req,res) => {
    //TODO -> create new user
    const body = req.body;
    // console.log(body)
    users.push({...body , id: users.length+1});

    fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users) , (err,data)=>{
        return res.json({status:"success",
                         id : users.length});
    })
})

app.patch("/api/users/:id" , (req,res) => {
    //TOTO -> edit the user with id
    return res.json({status: "pending"});
})

app.delete("/api/users/:id" , (req,res) => {
    //TOTO -> delete the user with id
    return res.json({status: "pending"});
})


app.listen(PORT , () => {
    console.log("server started at localhost:8000");
})