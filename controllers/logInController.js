// const pool = require("../database/pool");
// const bcrypt = require("bcryptjs");
// const db = require("../database/userQuery");

async function getLoginForm(req, res) {
  if (req.user) {
    return res.redirect("/chat-room");
  }

  const flashMessage = req.flash("error")[0];
  const usernameError =
    flashMessage === "No username found" ? flashMessage : null;
  const passwordError =
    flashMessage === "Incorrect password" ? flashMessage : null;

  res.render("./forms/log-in", {
    value: {
      username: null,
      password: null,
      usernameError,
      passwordError,
    },
  });
}

module.exports = {
  getLoginForm,
};
