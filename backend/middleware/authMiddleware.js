const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin"); // Import Admin model

const protect = async (req, res, next) => {
  const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch admin details from the database
    const admin = await Admin.findById(decoded.id).select("-password"); // Exclude password
    
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    req.admin = admin; // Attach full admin object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { protect };
