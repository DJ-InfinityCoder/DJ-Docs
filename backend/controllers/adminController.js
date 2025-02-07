const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ message: "Invalid email" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = generateToken(admin._id);
  res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });


  res.json({ message: "Login successful", token });
};

exports.getDashboard = async (req, res) => {
  res.json({ message: "Admin Dashboard", admin: req.admin });
};

exports.logoutAdmin = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logged out successfully" });
};
