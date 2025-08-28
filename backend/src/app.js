const express = require("express");

// Required to use .env file in DB
require('dotenv').config();

// Note: always import it under the dotenv.config();
const songRoutes = require("./routes/song.routes");

// Server is created
const server = express();

// Make express to understand the data 
server.use(express.json());

// Telling Express that we Create the SongRoutes
server.use("/", songRoutes);

module.exports = server;
