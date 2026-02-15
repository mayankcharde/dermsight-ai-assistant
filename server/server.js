const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve static files from images directory
// app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api", require("./routes/imageRoutes"));

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT),
);
