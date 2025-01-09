const pool = require("../database/pool");
const bcrypt = require("bcryptjs");
const db = require("../database/messagesQuery");

async function addMessage(req, res) {
  const { username, message } = req.body;
  await db.insertMessageQuery({ username, message });
  res.redirect("/");
}

module.exports = {
  addMessage,
};
