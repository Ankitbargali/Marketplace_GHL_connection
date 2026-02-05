const Token = require("../model/token_model");
const authcontroller = require("../controller/authentication_controller");

exports.getValidAccessToken = async () => {
  const acctoken = await Token.findOne();

  if (!acctoken) {
    throw new Error("No token found. Please authenticate first.");
  }

  const now = new Date();

  if (acctoken.expires_at > now) {
    return acctoken.accessToken;
  }

  const refreshed = await authcontroller.refreshAccessToken(
    acctoken.refreshToken
  );

  const newExpiresAt = new Date(Date.now() + refreshed.expires_in * 1000);

  acctoken.accessToken = refreshed.access_token;
  acctoken.expires_at = newExpiresAt;

  if (refreshed.refresh_token) {
    acctoken.refreshToken = refreshed.refresh_token;
  }

  await acctoken.save();

  console.log("Access token refreshed.");

  return acctoken.accessToken;
};
