const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
trackingId: {
  type: String,
  unique: true,
  required: true,
},
    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
priority: {
  type: String,
  enum: ["Low", "Medium", "High"],
  default: "Medium"
},
    adminReply: {
      type: String,
      default: "",
    },

    // ⭐ Rating
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    // 💬 Feedback
    feedback: {
      type: String,
      default: "",
    },

    // 📅 Feedback Date
    feedbackDate: {
      type: Date,
      default: null,
    },

    // =========================
    // Complaint Status Timeline
    // =========================
    statusHistory: [
      {
        status: {
          type: String,
        },

        message: {
          type: String,
        },

        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);