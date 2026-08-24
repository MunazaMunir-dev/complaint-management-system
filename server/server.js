const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

// ==============================
// Environment
// ==============================

console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

// ==============================
// MongoDB
// ==============================

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  await mongoose.connect(process.env.MONGO_URI);

  isConnected = true;

  console.log("✅ MongoDB Connected");
}

// ==============================
// Middleware
// ==============================

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// ==============================
// Database Middleware
// ==============================

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("❌ MongoDB Error:", error);

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// ==============================
// Upload Images
// ==============================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ==============================
// Routes
// ==============================

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const adminRoutes = require("./routes/adminRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/comments", commentRoutes);

// ==============================
// Home
// ==============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Complaint API is running...",
  });
});

// ==============================
// 404
// ==============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ==============================
// Export
// ==============================

module.exports = app;