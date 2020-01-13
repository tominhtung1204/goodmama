const ImgurStorage = require("multer-storage-imgur");
const multer = require("multer");
const fs = require("fs-extra");

const upload = multer({
  storage: ImgurStorage({ clientId: "f8868bcc9fe255c" })
});

module.exports = upload;
