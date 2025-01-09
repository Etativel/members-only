const express = require("express");
const router = express();
const messageController = require("../controllers/messageController");
router.use(express.urlencoded({ extended: true }));

// router.get("/sending-message", messageController.signUpForm);
router.post("/", messageController.addMessage);

module.exports = router;
