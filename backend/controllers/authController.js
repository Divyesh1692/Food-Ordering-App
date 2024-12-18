const { generateTokenAndSetCookies } = require("../middleware/authMiddleware");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    generateTokenAndSetCookies(user._id, res);
    res.status(201).json({ message: "User created", user: user });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "error creating user", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }
    generateTokenAndSetCookies(user._id, res);
    res.status(200).json({ message: "Logged in successfully", user: user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error logging in", error: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "error logging out", error: error.message });
  }
};

module.exports = { signup, login, logout };
