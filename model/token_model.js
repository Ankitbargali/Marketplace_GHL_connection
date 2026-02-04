const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    locationID: {
      type: String,
      required: true,
    },
    expires_at: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("token_model", tokenSchema);
