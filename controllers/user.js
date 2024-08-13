const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mailer");

const handleCreateNewUser = async (req, res) => {
  const { firstName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "Email already exists" });

    user = new User({ firstName, email, password });
    await user.save();

    const payload = { id: user.id, name: user.email };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "10h" },
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token, {
          path: "/",
        });
        res.status(201).json({
          success: true,
          email: user.email,
          token: token,
          firstName: user.firstName,
          lastName: user.lastName,
        });
      }
    );
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User Not Found!" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

    const payload = { id: user.id, email: user.email };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "10h" },
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token, {
          path: "/",
        });
        res.status(200).json({
          success: true,
          email: user.email,
          token: token,
          firstName: user.firstName,
          lastName: user.lastName,
        });
      }
    );
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const handleUserUpdate = async (req, res) => {
  const id = req.user._id;
  const { password } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.password = password;
    await user.save();

    res.status(200).json({ msg: "Password updated successfully!" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    const secret = process.env.JWT_SECRET || "defaultSecret";

    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: "1h",
    });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
    await sendMail({
      to: email,
      subject: "Password Reset Request",
      templateName: "forgotPassword",
      context: {
        firstName: user.firstName,
        resetLink,
      },
    });

    res.status(200).json({ msg: "Password reset link sent to your email." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  handleCreateNewUser,
  handleLoginUser,
  handleUserUpdate,
  forgotPassword,
};
