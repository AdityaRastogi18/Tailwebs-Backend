const express = require("express");
const {
  handleCreateNewUser,
  handleLoginUser,
  handleUserUpdate,
} = require("../controllers/user");
const { authValidator } = require("../validators");
const isAuthenticated = require("../middlewares/authMiddleware");

const router = express.Router();

router.patch("/", isAuthenticated, handleUserUpdate);
router
  .route("/signup")
  .post(authValidator.validateRegistration, handleCreateNewUser);
router.post("/login", authValidator.validateLogin, handleLoginUser);

module.exports = router;
