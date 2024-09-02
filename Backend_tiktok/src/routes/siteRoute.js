const express = require("express");
const router = express.Router();
const SiteController = require("../app/Controller/SiteController");
const multer = require("multer");
const upload = multer();
router.get("/", SiteController.index);
router.post("/likeVideos", upload.none(), SiteController.likeVideos);
module.exports = router;
