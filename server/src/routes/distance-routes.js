const express = require('express');
const multer = require('multer');
const uploadConfig = require('../config/upload');
const router = express.Router();
const upload = multer(uploadConfig);

const controllerUser = require('../controllers/distance-controller');

router
.get('/get-files', controllerUser.getFiles)
.post('/process-files', upload.single('image'),controllerUser.processFiles);

module.exports = router;
