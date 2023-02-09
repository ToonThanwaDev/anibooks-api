const multer = require("multer");

const imageFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback("Please upload only image", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images");
  },
  filename: (req, file, callback) => {
    callback(null, `${new Date().getTime()}-images-${file.originalname}`);
  }
});

const uploadFile = multer({ storage: storage, fileFilter: imageFilter });

module.exports = uploadFile;
