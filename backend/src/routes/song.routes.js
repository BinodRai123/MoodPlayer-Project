const express = require("express");
const multer = require("multer");
const songModel = require("../models/song.model")

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const uploadFile = require("../service/storage.service");

router.post("/songs", upload.single("audio"), async (req, res) => {
  try {
    const fileData = await uploadFile(req.file);
    const song = await songModel.create({
      title:req.body.title,
      artist:req.body.artist,
      audio:fileData.url,
      mood:req.body.mood
    })

    res.json({
      message: "post sucessful",
      song: song
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
});

module.exports = router;
