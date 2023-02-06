const { STATUS_COMPLETED, STATUS_PENDING } = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      status: {
        type: DataTypes.ENUM(STATUS_COMPLETED, STATUS_PENDING),
        allowNull: false,
        defaultValue: STATUS_PENDING
      }
    },
    { underscored: true }
  );
  return Order;
};
