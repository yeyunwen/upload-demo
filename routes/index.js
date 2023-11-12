var express = require("express");
const multer = require("multer");
const fs = require("fs");

const upload = multer({ dest: "public/images/uploads" });

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* POST upload file. */
router.post("/upload", upload.single("file"), function (req, res, next) {
  const fileName = req.file.originalname;
  const fileContent = fs.readFileSync(req.file.path);
  fs.writeFileSync(`public/images/uploads/${fileName}`, fileContent);

  res.send({
    data:
      "http://localhost:3000/images/uploads/" + decodeURIComponent(fileName),
  });
});

module.exports = router;
