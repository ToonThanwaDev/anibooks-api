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
      detail: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true, timestamps: false }
  );

  Product.associate = (db) => {
    Product.hasMany(db.Cart, {
      foreignKey: {
        name: "productId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Product.hasMany(db.orderItem, {
      foreignKey: {
        name: "productId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Product.belongsTo(db.Category, {
      foreignKey: {
        name: "categoryId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };

  return Product;
};
