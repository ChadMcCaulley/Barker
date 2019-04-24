const express = require("express");
const router = express.Router();
const {signin, signup, reset, forgotPassword} = require("../handlers/auth"); 

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/forgotPassword", forgotPassword);
router.post("/reset", reset);

module.exports = router;