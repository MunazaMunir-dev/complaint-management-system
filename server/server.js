const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

// =====================================================
// ENVIRONMENT
// =====================================================

console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

// =====================================================
// MONGODB CONNECTION
// =====================================================

let isConnected = false;

async function connectDB() {
  if (
    isConnected &&
    mongoose.connection.readyState === 1
  ) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  await mongoose.connect(process.env.MONGO_URI);

  isConnected = true;

  console.log("MongoDB Connected");
}
// =====================================================
// CORS
// =====================================================

const allowedOrigins = [
  "https://complaint-management-system-r6ft.vercel.app",

  // Other Vercel frontend deployments
  "https://complaint-management-system-sgrm.vercel.app",
  "https://complaint-management-system-lake.vercel.app",
  "https://complaint-management-system-rzmh.vercel.app",
  "https://complaint-management-system-ppnq.vercel.app",

  // Local development
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Postman / server-to-server
      if (!origin) {
        return callback(null, true);
      }

      // Exact allowed frontend
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow Vercel preview deployments of this project
      if (
        origin.endsWith(".vercel.app") &&
        origin.includes("complaint-management-system")
      ) {
        return callback(null, true);
      }

      console.log("CORS blocked origin:", origin);

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

    optionsSuccessStatus: 204,
  })
);
// =====================================================
// BODY PARSER
// =====================================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// =====================================================
// DATABASE MIDDLEWARE
// =====================================================

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB Error:", error);

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// =====================================================
// UPLOADS
// =====================================================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// =====================================================
// ROUTES
// =====================================================

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const adminRoutes = require("./routes/adminRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/test",
  testRoutes
);

app.use(
  "/api/complaints",
  complaintRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/comments",
  commentRoutes
);

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/api/health", async (req, res) => {
  try {
    await connectDB();

    return res.status(200).json({
      success: true,
      message: "Server and database are working",
      database:
        mongoose.connection.readyState === 1
          ? "connected"
          : "disconnected",
    });
  } catch (error) {
    console.error(
      "Health check error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// =====================================================
// HOME
// =====================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Complaint API is running...",
  });
});

// =====================================================
// 404
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =====================================================
// ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS blocked this origin",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// =====================================================
// EXPORT FOR VERCEL
// =====================================================

module.exports = app;

// =====================================================
// LOCAL DEVELOPMENT
// =====================================================

if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}`
    );
  });
}