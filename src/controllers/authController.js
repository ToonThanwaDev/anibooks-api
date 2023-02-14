const {
  validateRegister,
  validateLogin,
  validateInformationUser
} = require("../validators/authValidator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");

const { STATUS_PENDING } = require("../config/constants");
const { User, Payment, Order } = require("../models");
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

    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phone: user.phone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

exports.informationUser = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, address } = req.body;
    const value = { firstName, lastName, phone, address };

    const paymentUrl = await cloudinary.upload(req.file?.path);

    await User.update(value, { where: { id: req.user.id } });

    const resOrder = await Order.create({
      userId: req.user.id,
      status: STATUS_PENDING
    });

    const payment = {
      userId: req.user.id,
      slipImage: paymentUrl,
      orderId: resOrder.id
    };
    await Payment.create(payment);

    res.status(201).json({ payment });
  } catch (err) {
    next(err);
  }
};
