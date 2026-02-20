const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const journalRoutes = require("./routes/journal");
const exportRoutes = require("./routes/export");
const moodRoutes = require("./routes/mood");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/mood", moodRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("MindWell Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});