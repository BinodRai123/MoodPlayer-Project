const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    title:String,
    artist:String,
    audio:File
})

const songModel = mongoose.model("song", songSchema);

module.exports = songModel;