const db = require("../database/messagesQuery");

async function addMessage(req, res) {
  const { username, message } = req.body;

  try {
    await db.insertMessageQuery({ username, message });
    res.redirect("/");
  } catch (error) {
    console.error("Error inserting message:", error);
    res.status(500).send("An error occurred while adding the message.");
  }
}

async function deleteMessage(req, res) {
  const { id } = req.params;
  await db.deleteMessageQuery(id);
  res.redirect("/chat-room");
}

module.exports = {
  addMessage,
  deleteMessage,
};
