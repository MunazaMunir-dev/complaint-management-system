const Complaint = require("../models/Complaint");
const Notification = require("../models/Notification");
const sendEmail = require("../utils/sendEmail");

// ==============================
// CREATE COMPLAINT
// ==============================
exports.getComplaintByTrackingId = async (req,res)=>{

  try{

    const complaint = await Complaint.findOne({
      trackingId:req.params.trackingId
    })
    .populate("user","name email");


    if(!complaint){

      return res.status(404).json({
        message:"Complaint not found"
      });

    }


    res.status(200).json({
      complaint
    });


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};
exports.createComplaint = async (req, res) => {
  try {
    const trackingId = "CMP-" + Date.now();
    const complaint = await Complaint.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      location: req.body.location,
       trackingId: trackingId,
      image: req.file ? req.file.filename : "",
       priority: req.body.priority || "Medium",


      statusHistory: [
        {
          status: "Pending",
          message: "Complaint Submitted Successfully",
          
        },
      ],

      user: req.user.id,
    });

    // Email
    await sendEmail(
      req.user.email,
      "Complaint Submitted Successfully",
      `Hello ${req.user.name},

Your complaint has been submitted successfully.

Title: ${complaint.title}
Category: ${complaint.category}
Status: Pending

Thank you for using Complaint Management System.`
    );

    // Socket
    const io = req.app.get("io");

    if (io) {
      io.emit("newComplaint", complaint);
    }

    // Admin Notification
    await Notification.create({
      title: "New Complaint",
      message: `New complaint received: ${complaint.title}`,
    });

    res.status(201).json({
      success: true,
      message: "Complaint Created Successfully",
      complaint,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// GET MY COMPLAINTS
// ==============================

exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
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
// GET ALL COMPLAINTS
// ==============================

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email")
      .sort({
        createdAt: -1,
      });

    res.json({
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
// GET COMPLAINT BY ID
// ==============================

exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("user", "name email");

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      complaint,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// UPDATE COMPLAINT
// ==============================

exports.updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("user", "name email");

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    complaint.title = req.body.title || complaint.title;
    complaint.description = req.body.description || complaint.description;
    complaint.category = req.body.category || complaint.category;
    complaint.location = req.body.location || complaint.location;

    if (req.file) {
      complaint.image = req.file.filename;
    }

    await complaint.save();

    // Email
    await sendEmail(
      complaint.user.email,
      "Complaint Updated",
      `Hello ${complaint.user.name},

Your complaint has been updated successfully.

Title: ${complaint.title}

Thank you for using Complaint Management System.`
    );

    res.status(200).json({
      message: "Complaint Updated Successfully",
      complaint,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// DELETE COMPLAINT
// ==============================

exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    await complaint.deleteOne();

    res.status(200).json({
      message: "Complaint Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// ==============================
// ADMIN UPDATE COMPLAINT STATUS
// ==============================

exports.updateComplaintStatus = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("user", "name email");

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    complaint.status = req.body.status;

    complaint.statusHistory.push({
      status: req.body.status,
      message:
        req.body.status === "Pending"
          ? "Complaint Submitted"
          : req.body.status === "In Progress"
          ? "Admin started working on your complaint"
          : "Complaint Resolved Successfully",
    });

    await complaint.save();

    // Email Notification
    await sendEmail(
      complaint.user.email,
      "Complaint Status Updated",
      `Hello ${complaint.user.name},

Your complaint status has been updated.

Complaint:
${complaint.title}

New Status:
${complaint.status}

Thank you for using Complaint Management System.`
    );

    // Socket Notification
    const io = req.app.get("io");

    if (io) {
      io.emit("statusUpdated", complaint);
    }

    res.status(200).json({
      message: "Status Updated Successfully",
      complaint,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// ADMIN REPLY
// ==============================

exports.replyComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("user", "name email");

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    complaint.adminReply = req.body.adminReply;

    await complaint.save();

    const io = req.app.get("io");

    if (io) {
      io.emit("replyAdded", complaint);
    }

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
// RATE COMPLAINT
// ==============================

exports.rateComplaint = async (req, res) => {
  try {
    const { rating, feedback } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    // Only complaint owner can rate
    if (complaint.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    // Only resolved complaints
    if (complaint.status !== "Resolved") {
      return res.status(400).json({
        message: "Complaint is not resolved yet",
      });
    }

    // Allow only one rating
    if (complaint.rating > 0) {
      return res.status(400).json({
        message: "Rating already submitted",
      });
    }

    complaint.rating = rating;
    complaint.feedback = feedback;
    complaint.feedbackDate = new Date();

    await complaint.save();

    res.status(200).json({
      message: "Thank you for your feedback ❤️",
      complaint,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};







