const router = require('express').Router();
const multer = require('multer');
const uploadConfig = require('../config/setup-image');

const DistanceController = require('../controllers/distance-controller');

const distanceController = new DistanceController();
const upload = multer(uploadConfig);

router
  .get('/get-files', distanceController.index)
  .post('/process-files', upload.single('docFile'), distanceController.store);

module.exports = router;
