const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  quizScore: { type: Number, default: 0 },
  phishingScore: { type: Number, default: 0 },
  badges: { type: [String], default: [] }
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
