const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const uploadFile = require("../service/storage.service");

router.post("/songs", upload.single("audio"), async (req, res) => {
  try {
    console.log(req.body);

    const fileData = await uploadFile(req.file);
    console.log(fileData)

    res.json({
      message: "post sucessful",
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
