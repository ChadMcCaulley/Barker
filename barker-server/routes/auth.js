const express = require("express");
const router = express.Router();
const {signin, signup} = require("../handlers/auth");   // Just bring in the signup function

router.post("/signin", signin);
router.post("/signup", signup);

module.exports = router;