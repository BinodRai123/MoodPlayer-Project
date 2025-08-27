const express = require("express");
const songRoutes = require("./routes/song.routes");

// Required to use .env file in DB
require("dotenv").config();

// Server is created
const server = express();

// Make express to understand the data 
server.use(express.json());

// Telling Express that we Create the SongRoutes api
server.use("/",songRoutes);

module.exports = server;
