const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../connections/aws_connection");

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "hugobucket2409",
    acl: "public-read",
    contentType: multerS3.AUTCONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

module.exports = upload;
