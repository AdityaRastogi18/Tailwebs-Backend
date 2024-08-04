const express = require("express");
const { handleCreateNewUser, handleLoginUser } = require("../controllers/user");

const router = express.Router();

router.route("/signup").post(handleCreateNewUser);
router.route("/login").post(handleLoginUser);

module.exports = router;
