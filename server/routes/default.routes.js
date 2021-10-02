const defaultController = require("../controller/default.controller");
const consentNotificationController = require("../controller/consentNotification.controller");
const fiNotificationController = require("../controller/fiNotification.controller");

const loginController = require("../controller/login.controller")

const express = require('express');
const router = express.Router();

router.get("/", defaultController.Ping);
router.post("/Consent/Notification", consentNotificationController);
router.post("/FI/Notification", fiNotificationController);


router.post("/login", loginController)

module.exports = router
