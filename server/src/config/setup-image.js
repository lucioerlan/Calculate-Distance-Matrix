const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
  dest: path.resolve(process.env.FOLDER_PATH),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(process.env.FOLDER_PATH));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, file.key);
      });
    },
  }),
};
