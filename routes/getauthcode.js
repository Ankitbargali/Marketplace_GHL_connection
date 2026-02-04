const express = require("express");
const router = express.Router();
const getauthcode = require("../controller/authentication_controller");

router.get("/connect", (req, res) => {
  const link = getauthcode.getAuthorizationUrl();
  return res.redirect(link);
});

module.exports = router;
