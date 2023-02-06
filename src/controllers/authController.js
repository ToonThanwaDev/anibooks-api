const { validateRegister } = require("../validators/authValidator");
const bcrypt = require("bcryptjs");

const { User } = require("../models");
const createError = require("../utils/createError");

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);

    const user = await User.findOne({
      where: { email: value.email || "" }
    });

    if (user) {
      createError("Email already in used", 400);
    }

    value.password = await bcrypt.hash(value.password, 12);
    await User.create(value);

    res.status(201).json({ message: "register success" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
