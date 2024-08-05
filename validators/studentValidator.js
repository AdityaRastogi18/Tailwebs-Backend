const { check, validationResult, body } = require("express-validator");
const { customErrorFormatter } = require("./utils");

const validateStudent = [
  check("firstName").notEmpty().withMessage("First name is required"),
  check("rollNum")
    .isInt({ min: 0 })
    .withMessage("Roll number must be an integer"),
  check("subjects")
    .isArray({ min: 1 })
    .withMessage("Invalid value for subjects, expected an array"),
  body("subjects.*.name")
    .notEmpty()
    .withMessage("Subject name is required for each subject"),
  body("subjects.*.marks")
    .isInt({ min: 0 })
    .withMessage("Subject marks must be an integer for each subject"),

  (req, res, next) => {
    const errors = validationResult(req).formatWith(customErrorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array()[0].msg });
    }
    next();
  },
];

module.exports = {
  validateStudent,
};
