const express = require("express");
const router = express.Router();
const Payment = require("../Controllers/Payment.js");

router.get("/", Payment.initiate_session);

module.exports = router;