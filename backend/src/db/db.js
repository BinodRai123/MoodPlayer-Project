const mongoose = require("mongoose");

const mongodb_url = process.env.DATABASE_URL;

function ConnectDB(){
    mongoose.connect(mongodb_url).then(() => {
        console.log("db is connected");
    })
}

module.exports = ConnectDB;