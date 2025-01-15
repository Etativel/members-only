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

  // get the data stored in the post request
  const flashData = req.flash("formData")[0];
  const value = flashData || { username: "", password: "" };

  console.log(flashData);

  res.render("./forms/log-in", {
    value: {
      username: value.username,
      password: value.password,
      usernameError,
      passwordError,
    },
  });
}

module.exports = {
  getLoginForm,
};
