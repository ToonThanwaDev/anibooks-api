const {
  validateRegister,
  validateLogin
} = require("../validators/authValidator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    const value = validateLogin(req.body);

    const user = await User.findOne({
      where: { email: value.email }
    });

    if (!user) {
      createError("Invalid Email or Password", 400);
    }

    const isCorrect = await bcrypt.compare(value.password, user.password);

    if (!isCorrect) {
      createError("Invalid Email or Password", 400);
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
