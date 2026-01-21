const express = require("express");
const router = express.Router();
const cricketers = require("../data/cricketers.json");

router.get("/", (req, res) => {
  res.json(cricketers);
});

module.exports = router;
