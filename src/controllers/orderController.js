const { Order, orderItem } = require("../models");

exports.getOrder = async (req, res, next) => {
  try {
    const getAllOrder = await Order.findAll({
      where: { userId: req.user.id },
      include: {
        model: orderItem
      }
    });

    res.status(200).json({ getAllOrder });
  } catch (err) {
    next(err);
  }
};
