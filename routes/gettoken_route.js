const express = require("express");
const router = express.Router();
const authcontroller = require("../controller/authentication_controller");

router.get("/callback", authcontroller.handletoken);

module.exports = router;
