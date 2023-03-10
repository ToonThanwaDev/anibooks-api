const { STATUS_COMPLETED, STATUS_PENDING, STATUS_REJECTED } = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      status: {
        type: DataTypes.ENUM(STATUS_COMPLETED, STATUS_PENDING, STATUS_REJECTED),
        allowNull: false,
        defaultValue: STATUS_PENDING
      }
    },
    { underscored: true }
  );

  Order.associate = (db) => {
    Order.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Order.hasMany(db.Payment, {
      foreignKey: {
        name: "orderId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Order.hasMany(db.orderItem, {
      foreignKey: {
        name: "orderId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return Order;
};
