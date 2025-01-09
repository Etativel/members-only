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

async function isUsernameTaken(username) {
  const usernames = await db.getAllUsername();
  const listOfUsers = usernames.map((username) => username.username);
  if (!username) return "Username cannot be empty";
  return listOfUsers.includes(username.toLowerCase());
}

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const uniqueErr = "username already taken";
const emailErr = "must be a valid email address.";
const passwordLengthErr = "Password must be at least 8 characters long.";
const passwordLowercaseErr =
  "Password must include at least one lowercase letter.";
const passwordUppercaseErr =
  "Password must include at least one uppercase letter.";
const passwordNumberErr = "Password must include at least one number.";
const passwordSpecialCharErr =
  "Password must include at least one special character.";

const memberErr = "must be the valid member code: 111.";
const adminErr = "must be the valid admin code: 888.";

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
    .isLength({ min: 3, max: 10 })
    .withMessage(`Username ${lengthErr}`)
    .custom(async (value) => {
      const taken = await isUsernameTaken(value);
      if (taken) {
        throw new Error(uniqueErr);
      }
      return true;
    }),

  body("email").trim().isEmail().withMessage(emailErr),

  body("password")
    .isLength({ min: 8 })
    .withMessage(passwordLengthErr)
    .matches(/(?=.*[a-z])/)
    .withMessage(passwordLowercaseErr)
    .matches(/(?=.*[A-Z])/)
    .withMessage(passwordUppercaseErr)
    .matches(/(?=.*\d)/)
    .withMessage(passwordNumberErr)
    .matches(/(?=.*[@$!%*?&])/)
    .withMessage(passwordSpecialCharErr),

  body("member_code")
    .optional()
    .custom((value) => {
      if (!value) return true;
      if (value !== "111") {
        throw new Error(`Member code ${memberErr}`);
      } else return true;
    }),

  body("admin_code")
    .optional()
    .custom((value) => {
      if (!value) return true;

      if (value !== "888") {
        throw new Error(`Admin code ${adminErr}`);
      }
      return true;
    }),
];

const usersCreatePost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", {
        title: "Create user",
        errors: errors.array(),
        value: req.body,
      });
    }

    const {
      first_name,
      last_name,
      username,
      email,
      password,
      member_code,
      admin_code,
    } = req.body;
    const isAdminValid = admin_code === "888";

    let isMemberValid;
    if (isAdminValid) {
      isMemberValid = true;
    } else {
      isMemberValid = member_code === "111";
    }

    console.log(isAdminValid);
    console.log(isAdminValid);
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.createUser({
      first_name,
      last_name,
      username,
      email,
      password: hashedPassword,
      is_member: isMemberValid,
      is_admin: isAdminValid,
    });
    console.log(member_code);
    res.redirect("/");
  },
];

module.exports = {
  signUpForm,
  usersCreatePost,
};
