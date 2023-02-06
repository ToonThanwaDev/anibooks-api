module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      writer: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        validate: {
          notEmpty: true
        }
      },
      image: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      datail: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );
  return Product;
};
