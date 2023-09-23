const express = require("express");
const router = express.Router();
const Quotation = require("../Controllers/Quotation.js");

router.get("/", Quotation.calculate_price);

module.exports = router;