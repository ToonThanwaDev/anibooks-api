module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );
  return Category;
};
