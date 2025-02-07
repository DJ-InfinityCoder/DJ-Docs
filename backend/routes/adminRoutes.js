const express = require("express");
const { loginAdmin, getDashboard, logoutAdmin } = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/dashboard", protect, getDashboard);
router.post("/logout", logoutAdmin);

module.exports = router;
