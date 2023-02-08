const { Product, Category } = require("../models");

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll();

    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.productDetail = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const products = await Product.findOne({
      where: { id: productId },
      include: { model: Category }
    });
    res.status(201).json({ products });
  } catch (err) {
    next(err);
  }
};
