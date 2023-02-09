const cloudinary = require("../config/cloudinary");

exports.upload = async (filePath, publicId) => {
  const option = {
    unique_filename: false,
    use_filename: true,
    overwrite: true
  };

  if (publicId) {
    option.public_id = publicId;
  }

  option.folder = "/personal project/admin";

  const result = await cloudinary.uploader.upload(filePath, option);
  return result.secure_url;
};

exports.getPublicId = url => {
  const splitSlash = url.split("/");
  return splitSlash[splitSlash.length - 1].split(".")[0];
};
