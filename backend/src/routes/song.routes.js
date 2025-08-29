const express = require("express");
const multer = require("multer");
const songModel = require("../models/song.model");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const uploadFile = require("../service/storage.service");

router.post("/songs", upload.single("audio"), async (req, res) => {
  try {
    const fileData = await uploadFile(req.file);
    const song = await songModel.create({
      title: req.body.title,
      artist: req.body.artist,
      audio: fileData.url,
      mood: req.body.mood,
    });

    res.json({
      message: "post sucessful",
      song: song,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
});

router.get("/songs", async (req, res) => {
  try {
      const { mood } = req.query;
      console.log(req.query);

      const songs = await songModel.find({
        mood: mood,
      });

      res.status(200).json({
        message: "mood song fetched",
        songs: songs
      })

      res.json({
        message: "song according to mood fetched",
        songs: songs,
      });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
});

module.exports = router;
