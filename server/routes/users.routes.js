const usersController = require("../controller/users.controller")
const signupController = require("../controller/signup.controller")

const express = require('express');
const router = express.Router();

router.get("/consent/:mobileNumber", usersController.Consent);
router.post("/signup", signupController)
router.get("/transactions", usersController.GetUserTransactions);
router.get("/mutualFunds", usersController.GetUserMutualFunds)
router.get("/score",usersController.GenerateUserScore);


module.exports = router