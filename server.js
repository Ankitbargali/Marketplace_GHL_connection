const express = require("express");
require("dotenv").config();
const connect = require("./routes/getauthcode");
const callback = require("./routes/gettoken");
const mongoose = require("mongoose");
const app = express();

app.get("/", (req, res) => {
  res.send("server start");
});

app.use("/", connect);
app.use("/", callback);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected succsffulyy ");
  })
  .catch((err) => {
    console.error("MongoDB not connected ", err.message);
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT} `);
});
