const express = require("express");
const router = express.Router();

// Home page
router.get("/", (req, res) => {
  res.send("This is a vidly");
});

module.exports = router;
