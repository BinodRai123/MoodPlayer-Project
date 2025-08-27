const mongoose = require("mongoose");

function ConnectDB(){
    mongoose.connect("mongodb+srv://br163406:XnBuawrKEpYjPAX1@cluster0.vwqrkil.mongodb.net/moodplayer").then(() => {
        console.log("db is connected");
    })
}

module.exports = ConnectDB;