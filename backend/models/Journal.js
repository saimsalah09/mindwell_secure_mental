const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema(
  {
    encryptedText: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journal", journalSchema);
