module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
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

  Cart.associate = db => {
    Cart.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Cart.belongsTo(db.Product, {
      foreignKey: {
        name: "productId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return Cart;
};
