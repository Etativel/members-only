const express = require("express");
const router = express();
const messageDb = require("../database/messagesQuery");
router.use(express.urlencoded({ extended: true }));

router.get("/chat-room", async (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }
  try {
    console.log(req.user);
    const messages = await messageDb.getAllMessage();
    if (req.user.is_admin) {
      return res.render("adminChatRoom", { user: req.user, messages }); //change this to admin chatroom
    } else if (req.user.is_member) {
      return res.render("memberChatRoom", { user: req.user, messages });
    } else {
      return res.render("chatRoom", { user: req.user, messages });
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("An error occurred while loading messages.");
  }
});

module.exports = router;
