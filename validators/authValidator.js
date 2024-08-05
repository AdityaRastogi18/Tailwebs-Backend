const { check, validationResult } = require("express-validator");
const { customErrorFormatter } = require("./utils");

const validateRegistration = [
  check("firstName")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  check("email").isEmail().withMessage("Invalid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  (req, res, next) => {
    const errors = validationResult(req).formatWith(customErrorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array()[0].msg });
    }
    next();
  },
];

const validateLogin = [
  check("email").isEmail().withMessage("Invalid email address"),
  check("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req).formatWith(customErrorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array()[0].msg });
    }
    next();
  },
];

module.exports = {
  validateRegistration,
  validateLogin,
};
