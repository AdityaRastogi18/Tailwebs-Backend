const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const handleCreateNewUser = async (req, res) => {
  const body = req.body;
  const user = new User(body);
  await user.save();

  const payload = { id: user.id, name: user.email };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "10h" },
    (err, token) => {
      if (err) throw err;
      res.json({ success: true, email: user.email, token: token });
    }
  );
};

const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ msg: "Email is required!" });
  const user = await User.findOne({
    email,
  });
  if (!user) return res.status(404).json({ msg: "User Not Found!" });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ password: "Incorrect password" });
  }
  const payload = { id: user.id, email: user.email };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "10h" },
    (err, token) => {
      if (err) throw err;
      res.json({ success: true, email: user.email, token: token });
    }
  );
};

module.exports = { handleCreateNewUser, handleLoginUser };
