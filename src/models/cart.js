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
  return Cart;
};
