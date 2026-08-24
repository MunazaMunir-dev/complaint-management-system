const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

// ==============================
// Environment Check
// ==============================

console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

// ==============================
// MongoDB Connection
// ==============================

let isConnected = false;

async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) {
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
// CORS
// ==============================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://complaint-management-system-ppnq.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin
      // (Postman, server-to-server, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS blocked:", origin);

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// Handle preflight requests
app.options("*", cors());

// ==============================
// Body Parser
// ==============================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
      error: error.message,
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
// Home Route
// ==============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Complaint API is running...",
  });
});

// ==============================
// Health Check
// ==============================

app.get("/api/health", async (req, res) => {
  try {
    await connectDB();

    res.status(200).json({
      success: true,
      message: "Server and database are working",
      database: "connected",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
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
// Error Handler
// ==============================

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// ==============================
// Export for Vercel
// ==============================

module.exports = app;

// ==============================
// Local Server
// ==============================

if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}