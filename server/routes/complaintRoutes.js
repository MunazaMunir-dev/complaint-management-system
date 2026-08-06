const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
  updateComplaintStatus,
    rateComplaint,
  replyComplaint,
  getComplaintByTrackingId
  
} = require("../controllers/complaintController");



// ==============================
// Create Complaint (User)
// ==============================
router.post(
  "/",
  protect,
  upload.single("image"),
  createComplaint
);


// ==============================
// User My Complaints
// ==============================
router.get(
  "/my",
  protect,
  getMyComplaints
);


// ==============================
// Get All Complaints
// ==============================
router.get(
  "/",
  protect,
  getAllComplaints
);

// Track Complaint
router.get(
  "/track/:trackingId",
  getComplaintByTrackingId
);
// ==============================
// Get Complaint By ID
// ==============================
router.get(
  "/:id",
  protect,
  getComplaintById
);


// ==============================
// Update Complaint
// ==============================
router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateComplaint
);


// ==============================
// Delete Complaint
// ==============================
router.delete(
  "/:id",
  protect,
  deleteComplaint
);


// ==============================
// Admin Update Complaint Status
// ==============================
router.put(
  "/admin/status/:id",
  protect,
  admin,
  updateComplaintStatus
);


// ==============================
// Admin Reply Complaint
// ==============================
router.put(
  "/reply/:id",
  protect,
  admin,
  replyComplaint
);

router.put(
  "/:id/rating",
  protect,
  rateComplaint
);

module.exports = router;