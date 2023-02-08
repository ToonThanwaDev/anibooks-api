const { Product } = require("../models");

exports.getAllProduct = async (req, res, next) => {
  const products = await Product.findAll();

  res.status(200).json(products);
};
