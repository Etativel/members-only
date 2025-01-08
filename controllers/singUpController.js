const pool = require("../database/pool");
const bcrypt = require("bcryptjs");
const db = require("../database/userQuery");

const { body, validationResult } = require("express-validator");

async function signUpForm(req, res) {
  res.render("sign-up", {
    errors: [],
    value: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      member_code: "",
      admin_code: "",
    },
  });
}

async function isUnsernameTaken(username) {
  const usernames = await db.getAllUsername();
  const listOfUsers = usernames.map((username) => username.username);
  if (!username) return "Username cannot be empty";
  return listOfUsers.includes(username.toLowerCase());
}

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const uniquieErr = "username already taken";
const validateUser = [
  body("first_name")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("last_name")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("username")
    .trim()
    .isAlpha()
    .withMessage(uniquieErr)
    .isLength({ min: 3, max: 10 })
    .withMessage(`Username ${lengthErr}`)
    .custom(async (value) => {
      const taken = await isUnsernameTaken(value);
      if (taken) {
        throw new Error(uniquieErr);
      }
      return true;
    }),
];

const usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", {
        title: "Create user",
        errors: errors.array(),
        value: req.body,
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    //   usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];

module.exports = {
  signUpForm,
  usersCreatePost,
};
