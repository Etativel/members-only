const express = require("express");
const router = express();
const messageDb = require("../database/messagesQuery");
router.use(express.urlencoded({ extended: true }));

router.get("/chat-room", async (req, res) => {
  if (!req.user) {
    res.redirect("/log-in");
  }
  try {
    console.log(req.user);
    const messages = await messageDb.getAllMessage();
    res.render("chatRoom", { user: req.user, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("An error occurred while loading messages.");
  }
});

module.exports = router;
