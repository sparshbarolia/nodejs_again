const express = require("express")

const {connectMongoDb} = require("./connection")
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

//connecting to mongoDB
connectMongoDb('mongodb+srv://admin:admin@cluster0.77usmop.mongodb.net/?retryWrites=true&w=majority');

//built in middleware
//form data ko body me dalega(post request ke liye use kia h)
app.use(express.urlencoded({extended : false}));

// Routes
//agr / ke baad api/users ho to userRouter se /api/uer vala run krdo
app.use("/" , userRouter);

app.listen(PORT , () => {
    console.log("server started at localhost:8000");
})