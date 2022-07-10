const express = require("express")
const mainAppController = require("./controller.js")
const router = express.Router();

router.post("/",mainAppController.pushNotification)
module.exports = router