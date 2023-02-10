const { Cart, Product } = require("../models");

exports.getCart = async (req, res, next) => {
  try {
    const cartProduct = await Cart.findAll({
      where: { userId: req.user.id },
      include: { model: Product }
    });
    res.status(200).json({ cartProduct });
  } catch (err) {
    next(err);
  }
};
