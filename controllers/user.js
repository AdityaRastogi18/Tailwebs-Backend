const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

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
        res.json({
          success: true,
          email: user.email,
          token: token,
          firstName: user.firstName,
          lastName: user.lastName,
        });
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
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
        res.json({
          success: true,
          email: user.email,
          token: token,
          firstName: user.firstName,
          lastName: user.lastName,
        });
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleCreateNewUser, handleLoginUser };
