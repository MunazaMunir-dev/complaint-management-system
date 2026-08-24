
const dns = require("dns");

// DNS servers for MongoDB Atlas SRV resolution
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

// Check environment variable
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

const app = express();

// ==============================
// Routes
// ==============================

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const adminRoutes = require("./routes/adminRoutes");
const commentRoutes = require("./routes/commentRoutes");

// ==============================
// Middleware
// ==============================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// ==============================
// Upload Images
// ==============================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ==============================
// API Routes
// ==============================

app.use("/api/auth", authRoutes);

app.use("/api/test", testRoutes);

app.use("/api/complaints", complaintRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/comments", commentRoutes);

// ==============================
// Home Route
// ==============================

app.get("/", (req, res) => {
  res.send("Complaint API is running...");
});

// ==============================
// MongoDB Atlas Connection
// ==============================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((error) => {
    console.log("❌ MongoDB Error:", error);
  });

// ==============================
// HTTP Server
// ==============================

const server = http.createServer(app);

// ==============================
// Socket.io Setup
// ==============================

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ==============================
// Socket Connection
// ==============================

io.on("connection", (socket) => {
  console.log("🔵 User Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 User Disconnected:", socket.id);
  });
});

// ==============================
// Make io Available Everywhere
// ==============================

app.set("io", io);

// ==============================
// Server Start
// ==============================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});