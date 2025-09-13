const express = require("express");
const router = express.Router();
const User = require("../models/User"); // we’ll add score field

// Submit quiz score
router.post("/submit", async (req, res) => {
  try {
    const { userId, score } = req.body;
    if (!userId || score == null) return res.status(400).json({ msg: "Invalid data" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.score = Math.max(user.score || 0, score); // keep best score
    await user.save();

    res.json({ msg: "Score updated", score: user.score });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
