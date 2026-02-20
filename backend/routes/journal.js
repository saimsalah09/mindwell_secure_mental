const express = require("express");
const CryptoJS = require("crypto-js");
const Journal = require("../models/Journal");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/* POST Journal */
router.post("/", authMiddleware, async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text required" });
  }

  const encryptedText = CryptoJS.AES.encrypt(
    text,
    process.env.SECRET_KEY
  ).toString();

  const journal = new Journal({
    encryptedText,
    userId: req.user.id,
  });

  await journal.save();
  res.json({ message: "Journal saved successfully" });
});

/* GET Journal */
router.get("/", authMiddleware, async (req, res) => {
  const entries = await Journal.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });

  const data = entries.map((item) => {
    const bytes = CryptoJS.AES.decrypt(
      item.encryptedText,
      process.env.SECRET_KEY
    );
    return {
      text: bytes.toString(CryptoJS.enc.Utf8),
      date: item.createdAt,
    };
  });

  res.json(data);
});

// ==============================
// UPDATE JOURNAL
// ==============================
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Journal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { text: req.body.text },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.json({ message: "Journal updated", journal: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});


// ==============================
// DELETE JOURNAL
// ==============================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Journal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.json({ message: "Journal deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});
module.exports = router;