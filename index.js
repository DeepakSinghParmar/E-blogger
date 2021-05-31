const express = require("express");
const bodyParser = require("body-parser");
const connect = require("./config/db");
const path = require("path");
const router = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const profileRoutes = require("./routes/profileRoutes");
const cors = require("cors");
const cloudinary = require("cloudinary");

require("dotenv").config();
const app = express();

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// connect mongodb database
connect();
app.use(bodyParser.json());
app.use(cors());
app.use("/", router);
app.use("/", postRoutes);
app.use("/", profileRoutes);
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build/")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log("Your app is running");
});
