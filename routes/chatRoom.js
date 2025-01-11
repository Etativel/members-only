const express = require("express");
const router = express();
const messageDb = require("../database/messagesQuery");
router.use(express.urlencoded({ extended: true }));

function roleBasedRedirect(req, res, next) {
  if (req.user.is_admin) {
    res.locals.view = "adminChatRoom";
  } else if (req.user.is_member) {
    res.locals.view = "memberChatRoom";
  } else {
    res.locals.view = "chatRoom";
  }
  next();
}

router.get("/chat-room", roleBasedRedirect, async (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }
  try {
    console.log(req.user);
    const messages = await messageDb.getAllMessage();
    res.render(res.locals.view, { user: req.user, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("An error occurred while loading messages.");
  }
});

module.exports = router;
