const express = require("express")
const mongoose = require("mongoose");

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
    },
    {timestamps: true}  //har entry ke sath time stamp store hojaegi DB me
);

//                          MODEL
//sparshusers naam ka collection bn jaega MONGO BASICS DB me
const UserDB = mongoose.model("sparshuser",userSchema);

                            //MIDDLEWARES

//built in middleware
//form data ko body me dalega(post request ke liye use kia h)
app.use(express.urlencoded({extended : false}));

//ROUTES
//TEST THESE REQUESTS IN POSTMAN

app.get("/users" , async (req,res) => {
    const allDbUsers = await UserDB.find({});  //empty means sbhi data le aao

    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li> ${user.firstName} - ${user.email} </li>`).join("")}
    </ul>
    `;
    res.send(html);
})

app.get("/api/users" , async (req,res) => {
    const allDbUsers = await UserDB.find({});

    //json data h to res.json likha
    return res.json(allDbUsers);
})


app.get("/api/users/:id" ,async (req,res) => {
    const DbUserWithId = await UserDB.findById(req.params.id);
    
    return res.json(DbUserWithId);
})

//async function bnadia ise
//WE CAN TEST THIS REQUEST IN POSTMAN
// link -> http://localhost:8000/api/users
// method -> post
// go to body -> x-www-form-urlencoded
//and add first_name,last_name .... as keys and give values
app.post("/api/users" ,async (req,res) => {
    //TODO -> create new user
    const body = req.body;

    //new entry created in DB
    await UserDB.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    })

    //ye status code and json msg POSTMAN pr dikhega
    return res.status(201).json({msg : "success"});
})

app.patch("/api/users/:id" , async (req,res) => {
    //TODO -> edit the user with id

    //                            (<jis ID ko change krna> , <kya change krna usme>)
    await UserDB.findByIdAndUpdate(req.params.id , {jobTitle: "switched"})

    return res.json({status: "success"});
})

app.delete("/api/users/:id" ,async (req,res) => {
    //TOTO -> delete the user with id
    await UserDB.findByIdAndDelete(req.params.id);

    return res.json({status: "success"});
})


app.listen(PORT , () => {
    console.log("server started at localhost:8000");
})