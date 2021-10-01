const usersController = require("../controller/users.controller")
const express = require('express');
const router = express.Router();

router.get("/consent/:mobileNumber", usersController.Consent);

module.exports = router
