const Joi = require("joi");
const validate = require("./validate");

const registerSchema = Joi.object({
  username: Joi.string().trim().required().messages({
    "any.required": "Username is required",
    "string.empty": "Username is required",
    "string.base": "Username must be a string"
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "any.required": "Email is required",
    "string.empty": "Email is required"
  }),
  password: Joi.string().alphanum().min(6).required().trim().messages({
    "string.empty": "Password is required",
    "string.alphanum": "Password must contain number or alphabet",
    "string.min": "Password mush have at least 6 characters"
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .trim()
    .messages({
      "any.only": "Password and confirm password did not match",
      "string.empty": "Confirm password is required"
    })
    .strip()
});

exports.validateRegister = validate(registerSchema);

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": "Email is required",
    "string.empty": "Email is required"
  }),
  password: Joi.string().required()
});

exports.validateLogin = validate(loginSchema);
