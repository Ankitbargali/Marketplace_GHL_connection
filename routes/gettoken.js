const express = require("express");
const router = express.Router();
const Token = require("../model/token_model");
const exchangecodefromtoken = require("../controller/authentication_controller");

router.get("/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("Authorization code missing");
  }
  const response = await exchangecodefromtoken.gettoken(code);

  const savetoken = await Token.create({
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    locationID: response.locationId,
    expires_at: response.expires_in,
  });

  res.status(200).json({
    message: "Token saved successfully",
    token: savetoken,
  });
});

module.exports = router;
