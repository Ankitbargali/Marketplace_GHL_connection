require("dotenv").config();
const express = require("express");
const connect = require("./routes/getauthcode_route");
const callback = require("./routes/gettoken_route");
const contact = require("./routes/contact_route");
const mongoose = require("mongoose");
const app = express();

app.get("/", (req, res) => {
  res.send(`this is my page`);
});

//middleware
app.use(express.json());

//routes
app.use("/", connect);
app.use("/", callback);
app.use("/", contact);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected succsffuly");
  })
  .catch((err) => {
    console.error("MongoDB not connected ", err.message);
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT} `);
});
