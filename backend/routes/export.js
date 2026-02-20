const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Journal = require("../models/Journal");
const Mood = require("../models/Mood");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const journals = await Journal.find({ userId: req.user.id });
    const moods = await Mood.find({ userId: req.user.id });

    const exportData = {
      journals,
      moods,
    };

    res.json(exportData);

  } catch (err) {
    res.status(500).json({ message: "Export failed" });
  }
});

module.exports = router;