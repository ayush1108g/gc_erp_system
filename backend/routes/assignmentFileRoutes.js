const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();

const fileController = require("../controllers/fileUploadController");

router.get("/upload-file", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

router
  .route("/upload-file")
  .post(upload.any(), fileController.uploadAssignmentFile);

module.exports = router;
