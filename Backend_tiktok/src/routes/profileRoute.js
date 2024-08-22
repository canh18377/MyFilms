const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const ProfileController = require("../app/Controller/ProfileController");

//lưu trữ static file
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public", "uploads", "images"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({ storage: storage });

router.post(
  "/update",
  upload.single("profilePhoto"),
  ProfileController.updateProflie
);
router.get("/videos/:author", ProfileController.getVideo);
router.get("/:author", ProfileController.index);

module.exports = router;
