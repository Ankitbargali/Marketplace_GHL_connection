const express = require("express");
const router = express.Router();
const authcontroller = require("../controller/authentication_controller");

router.get("/connect", authcontroller.handlecode);

module.exports = router;
