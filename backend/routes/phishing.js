const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/submit", async (req, res) => {
  try {
    const { userId, correct } = req.body;
    if (!userId) return res.status(400).json({ msg: "Missing userId" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (correct) user.phishingScore += 10; // +10 points for correct
    if (user.phishingScore >= 50 && !user.badges.includes("Phishing Hunter")) {
      user.badges.push("Phishing Hunter");
    }

    await user.save();
    res.json({ msg: "Updated", phishingScore: user.phishingScore, badges: user.badges });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
