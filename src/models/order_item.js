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
  return orderItem;
};
