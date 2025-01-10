const express = require("express");
const router = express();
const messageController = require("../controllers/messageController");
router.use(express.urlencoded({ extended: true }));

router.post("/chat-room", messageController.addMessage);
router.post("/delete/:id", messageController.deleteMessage);
module.exports = router;
