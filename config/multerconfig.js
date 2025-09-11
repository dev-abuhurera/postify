const multer = require('multer');
const path = require('path');
const crypto = require('crypto');


// file storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/public/images/uploads')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, (err, buffer) => {
        const fn = buffer.toString('hex') + path.extname(file.originalname);
        cb(null, fn);
    });
}
})
//exporting the upload object
const upload = multer({ storage: storage })

module.exports = upload;