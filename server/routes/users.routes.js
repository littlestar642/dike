const usersController = require("../controller/users.controller")
const signupController = require("../controller/signup.controller")

const express = require('express');
const router = express.Router();

router.get("/consent/:mobileNumber", usersController.Consent);
router.get("/get-data", usersController.GetData)
router.post("/signup", signupController)


module.exports = router
