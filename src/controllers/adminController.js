const fs = require("fs");

const { Product, Category } = require("../models");
const cloudinary = require("../utils/cloudinary");

exports.addProduct = async (req, res, next) => {
  try {
    const productImage = await cloudinary.upload(req.file?.path, null, "Products");

    const category = await Category.create({
      title: req.body.title
    });

    const addProduct = await Product.create({
      name: req.body.name,
      writer: req.body.writer,
      price: req.body.price,
      image: productImage,
      detail: req.body.detail,
      categoryId: category.id
    });

    res.status(200).json({ addProduct });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.editProduct = async (req, res, next) => {
  try {
    let editProductImage;

    if (req.file) {
      editProductImage = await cloudinary.upload(req.file?.path, null, "Products");
    }

    const { image, name, writer, price, detail } = req.body;
    const value = { image: editProductImage, name, writer, price, detail };

    const editProduct = await Product.update(value, {
      where: { id: +req.params.productId }
    });

    const updateCategory = await Category.update(
      {
        title: req.body.title
      },
      { where: { Id: +req.params.categoryId } }
    );

    res.status(200).json({ message: `event was successfully updated` });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const deleteProduct = await Product.findOne({
      where: { id: +req.params.productId }
    });

    await deleteProduct.destroy();

    res.status(200).json();
  } catch (err) {
    next(err);
  }
};
