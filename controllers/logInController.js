// const pool = require("../database/pool");
// const bcrypt = require("bcryptjs");
// const db = require("../database/userQuery");

async function getLoginForm(req, res) {
  res.render("log-in", {
    value: {
      username: null,
      password: null,
    },
  });
}

module.exports = {
  getLoginForm,
};
