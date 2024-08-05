const express = require("express");
const { handleCreateNewUser, handleLoginUser } = require("../controllers/user");
const { authValidator } = require("../validators");

const router = express.Router();

router
  .route("/signup")
  .post(authValidator.validateRegistration, handleCreateNewUser);
router.route("/login").post(authValidator.validateLogin, handleLoginUser);

module.exports = router;
