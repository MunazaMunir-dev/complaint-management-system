const User = require("../models/User");
const Complaint = require("../models/Complaint");


// ==============================
// Admin Dashboard Statistics
// ==============================
exports.getDashboardStats = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalComplaints = await Complaint.countDocuments();


    const pendingComplaints = await Complaint.countDocuments({
      status: "Pending"
    });


    const inProgressComplaints = await Complaint.countDocuments({
      status: "In Progress"
    });


    const resolvedComplaints = await Complaint.countDocuments({
      status: "Resolved"
    });


    res.status(200).json({

      totalUsers,

      totalComplaints,

      pendingComplaints,

      inProgressComplaints,

      resolvedComplaints

    });


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
// =============================
// Admin Reply to Complaint
// =============================

exports.replyComplaint = async (req, res) => {
  try {

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    complaint.adminReply = req.body.adminReply;

    await complaint.save();

    res.status(200).json({
      message: "Reply Added Successfully",
      complaint,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// ==============================
// Admin Get All Complaints
// ==============================
exports.getAllAdminComplaints = async (req, res) => {
  try {

    const complaints = await Complaint.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });


    res.status(200).json({
      count: complaints.length,
      complaints,
    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// ==============================
// Admin Get All Users
// ==============================

exports.getAllUsers = async (req, res) => {
  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });


    res.status(200).json({

      count: users.length,
      users

    });


  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }
};