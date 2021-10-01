const defaultController = require("../controller/default.controller");
const consentNotificationController = require("../controller/consentNotification.controller");
const fiNotificationController = require("../controller/fiNotification.controller");
const express = require('express');
const router = express.Router();

router.get("/", defaultController.Ping);
router.get("/get-data", defaultController.GetData)
router.post("/Consent/Notification", consentNotificationController);
router.post("/FI/Notification", fiNotificationController);

module.exports = router