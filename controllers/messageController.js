const pool = require("../database/pool");
const bcrypt = require("bcryptjs");
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

module.exports = {
  addMessage,
};
