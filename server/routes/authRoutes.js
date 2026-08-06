const express = require("express");
const router = express.Router();


// Controller
const {
  register,
  login,
  getProfile
} = require("../controllers/authController");


// Middleware
const {
  protect
} = require("../middleware/authMiddleware");



// =====================
// AUTH ROUTES
// =====================


// Register
router.post(
  "/register",
  register
);



// Login
router.post(
  "/login",
  login
);



// Get Profile
router.get(
  "/profile",
  protect,
  getProfile
);



module.exports = router;