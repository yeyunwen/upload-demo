var express = require('express');
const multer = require('multer')
const fs = require('fs')

const upload = multer({ dest: 'uploads/' })

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* POST upload file. */
router.post('/upload', upload.single('file'), function(req, res, next) {
  const fileName = req.file.originalname
  const fileContent = fs.readFileSync(req.file.path)
  fs.writeFileSync(`uploads/${fileName}`, fileContent)
  
  res.send(req.file);
});

module.exports = router;
