const { Order, orderItem, Payment, User } = require("../models");

exports.getOrder = async (req, res, next) => {
  try {
    const getAllOrder = await Order.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: orderItem
        }
      ]
    });

    res.status(200).json({ getAllOrder });
  } catch (err) {
    next(err);
  }
};

exports.getOrderUser = async (req, res, next) => {
  try {
    const getOrderUser = await Order.findAll({
      include: [
        {
          model: orderItem
        },
        {
          model: User
        },
        {
          model: Payment
        }
      ]
    });

    res.status(200).json({ getOrderUser });
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const updateOrder = await Order.update(
      { status: req.body.status },
      { where: { id: req.body.id } }
    );
    res.status(200).json({ updateOrder });
  } catch (err) {
    next(err);
  }
};
