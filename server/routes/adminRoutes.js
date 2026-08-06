const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const {
getNotifications,
markRead
}=require("../controllers/notificationController");



router.get(
"/notifications",
protect,
admin,
getNotifications
);



router.put(
"/notifications/:id",
protect,
admin,
markRead
);
const {
  getDashboardStats,
  getAllAdminComplaints,
  getAllUsers
} = require("../controllers/adminController");



// ==============================
// Admin Dashboard Stats
// ==============================

router.get(
  "/dashboard",
  protect,
  admin,
  getDashboardStats
);




// ==============================
// Admin Get All Complaints
// ==============================

router.get(
  "/complaints",
  protect,
  admin,
  getAllAdminComplaints
);




// ==============================
// Admin Get All Users
// ==============================

router.get(
  "/users",
  protect,
  admin,
  getAllUsers
);



module.exports = router;