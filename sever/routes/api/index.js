const express = require("express")
const router = express.Router();

router.use("/notify",require("./mainApp"))

module.exports = router;