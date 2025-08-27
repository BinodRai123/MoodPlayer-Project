const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({Storage:multer.memoryStorage()});

// API is created;
router.post("/songs",(req, res) => {
    console.log(req.body);
    res.json({
        message: "song post completed"
    })
})

module.exports = router;