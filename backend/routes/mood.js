const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Mood = require("../models/Mood");

// SAVE MOOD
router.post("/", auth, async (req, res) => {
  try {
    const mood = new Mood({
      user: req.user.id,
      mood: req.body.mood
    });

    await mood.save();
    res.json({ message: "Mood saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET MOODS
router.get("/", auth, async (req, res) => {
  try {
    const moods = await Mood
      .find({ user: req.user.id })
      .sort({ createdAt: 1 });

    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;