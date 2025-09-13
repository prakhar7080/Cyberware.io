const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const phishingRoutes = require("./routes/phishing");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();  // <<== CREATE APP FIRST
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(()=>console.log("✅ MongoDB Connected"))
.catch(err=>console.log("❌ DB Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/phishing", phishingRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// Serve frontend in production
const path = require("path");
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/index.html"));
});

// Start server
app.listen(PORT, ()=>console.log(`🚀 Server running on port ${PORT}`));
