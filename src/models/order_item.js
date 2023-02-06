module.exports = (sequelize, DataTypes) => {
  const orderItem = sequelize.define(
    "orderItem",
    {
      quantity: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );

  orderItem.associate = db => {
    orderItem.belongsTo(db.Order, {
      foreignKey: {
        name: "orderId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    orderItem.belongsTo(db.Product, {
      foreignKey: {
        name: "productId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return orderItem;
};
