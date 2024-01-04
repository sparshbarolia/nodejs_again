const mongoose = require("mongoose");

// //connecting to DB
// mongoose.connect('mongodb+srv://admin:admin@cluster0.77usmop.mongodb.net/?retryWrites=true&w=majority')
// .then(() => console.log("MongoDB connected"))
// .catch((err) => console.log("Mongo Error" , err));

async function connectMongoDb(url) {
    // console.log("MongoDB Conneted");
    // return mongoose.connect(url);
    await mongoose.connect(url);
    console.log("MongoDB Connected")
}

module.exports = {
    connectMongoDb,
};