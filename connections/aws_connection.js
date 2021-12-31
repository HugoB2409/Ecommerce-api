const aws = require("aws-sdk");

aws.config.update({
  accessKeyId: process.env.ACCES_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCES_KEY,
});

const s3 = new aws.S3();

module.exports = s3;
