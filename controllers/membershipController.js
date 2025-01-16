const pool = require("../database/pool");
const bcrypt = require("bcryptjs");
const db = require("../database/userQuery");

async function getMembershipForm(req, res) {
  if (!req.user) {
    return res.redirect("/log-in");
  } else if (req.user.is_member) {
    return res.redirect("/chat-room");
  } else if (req.user.is_admin) {
    return res.redirect("/chat-room");
  }

  console.log(req.user);
  res.render("./forms/membership", {
    errors: [],
    value: { code: "", username: req.user.username },
  });
}

const { body, validationResult } = require("express-validator");

const memberErr = "must be the valid member code. Hint: 111.";
const validateCode = [
  body("member_code")
    .optional()
    .custom((value) => {
      if (!value) return true;
      if (value !== "111") {
        throw new Error(`Member code ${memberErr}`);
      } else return true;
    }),
];

const updateMembership = [
  validateCode,
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).render("./forms/membership", {
        title: "Membership",
        errors: errors.array(),
        value: req.body,
      });
    }

    const { member_code } = req.body;
    const isCodeValid = member_code === "111";
    await db.updateMembershipQuery({
      username: req.user.username,
      is_member: isCodeValid,
    });
    res.redirect("/chat-room");
  },
];

async function testing(req, res) {
  const color = await getRandomColor();
  res.send(color);
}

module.exports = {
  getMembershipForm,
  updateMembership,
};
