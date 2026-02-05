const express = require("express");
const router = express.Router();
const contactcontroller = require("../controller/contact_controller");

router.post("/contacts", contactcontroller.createContact);

module.exports = router;
