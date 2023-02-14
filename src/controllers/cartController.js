const { Cart, Product } = require("../models");

exports.getCart = async (req, res, next) => {
  try {
    const cartProduct = await Cart.findAll({
      where: { userId: req.user.id },
      include: {
        model: Product
      }
    });
    res.status(200).json({ cartProduct });
  } catch (err) {
    next(err);
  }
};

exports.createCart = async (req, res, next) => {
  try {
    const alreadyProduct = await Cart.findOne({
      where: { productId: req.body.productId, userId: req.user.id }
    });

    if (alreadyProduct) {
      await Cart.update(req.body, {
        where: { productId: req.body.productId }
      });
      return res.status(200).json({ message: "Product already add" });
    }

    const addToCart = await Cart.create({
      quantity: 1,
      productId: req.body.productId,
      userId: req.user.id
    });

    res.status(201).json({ addToCart, message: "Add Success" });
  } catch (err) {
    next(err);
  }
};

exports.increase = async (req, res, next) => {
  try {
    const { quantity } = await Cart.findOne({
      where: { id: req.body.cartId },
      raw: true
    });

    const increaseQuantity = await Cart.update(
      {
        quantity: quantity + 1
      },
      {
        where: { id: req.body.cartId }
      }
    );

    const increaseProduct = await Cart.findAll({
      where: { userId: req.user.id },
      include: {
        model: Product
      }
    });

    res.status(200).json({ increaseProduct });
  } catch (err) {
    next(err);
  }
};

exports.decrease = async (req, res, next) => {
  try {
    const { quantity } = await Cart.findOne({
      where: { id: req.body.cartId },
      raw: true
    });

    if (quantity > 1) {
      const decreaseQuantity = await Cart.update(
        {
          quantity: quantity - 1
        },
        {
          where: { id: req.body.cartId }
        }
      );
      return decreaseQuantity;
    }

    const decreaseProduct = await Cart.findAll({
      where: { userId: req.user.id },
      include: {
        model: Product
      }
    });

    res.status(200).json({ decreaseProduct });
  } catch (err) {
    next(err);
  }
};

exports.deleteProductCart = async (req, res, next) => {
  try {
    const deleteProduct = await Cart.findOne({
      where: { productId: req.params.productId, userId: req.user.id }
    });

    const allProduct = await Cart.findAll({
      where: { userId: req.user.id },
      include: {
        model: Product
      }
    });

    await deleteProduct.destroy();
    res.status(200).json({ allProduct });
  } catch (err) {
    next(err);
  }
};
