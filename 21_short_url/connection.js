const mongoose = require("mongoose");

async function connectMongoDb(url) {
    await mongoose.connect(url);
    console.log("MongoDB Connected")
}

module.exports = {
    connectMongoDb,
};