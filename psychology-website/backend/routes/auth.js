const express = require("express");
const router = express.Router();
const authController = require("../controller/AuthController");

router.post("/", authController.handleLogin);

module.exports = router;
