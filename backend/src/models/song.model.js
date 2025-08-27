const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    title:String,
    songUrl:String
})

const songModel = mongoose.model("song", songSchema);

module.exports = songModel;