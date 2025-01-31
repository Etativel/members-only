const pool = require("../database/pool");
const bcrypt = require("bcryptjs");
const db = require("../database/userQuery");

const { body, validationResult } = require("express-validator");

const profileColors = [
  "#FF6F61",
  "#FFD700",
  "#FFB74D",
  "#4CAF50",
  "#64B5F6",
  "#FF4081",
  "#BA68C8",
  "#FFF176",
  "#81D4FA",
  "#AED581",
  "#F06292",
  "#7986CB",
  "#FFD54F",
  "#DCE775",
  "#FFAB91",
  "#B2FF59",
  "#69F0AE",
  "#F8BBD0",
  "#FF8A65",
  "#E1BEE7",
];

async function getRandomColor() {
  const index = Math.floor(Math.random() * profileColors.length);
  return profileColors[index];
}

async function signUpForm(req, res) {
  res.render("./forms/sign-up", {
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

async function isEmailUsed(email) {
  const queryEmail = await db.getEmail(email);
  return queryEmail.length >= 1;
}

async function isUsernameTaken(username) {
  const usernames = await db.getUsername(username);
  if (!username) return "Username cannot be empty";
  return usernames.length >= 1;
}

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const uniqueErr = "username already taken";
const emailErr = "Email must be a valid email address.";
const passwordLengthErr = "Password must be at least 8 characters long.";
const passwordLowercaseErr =
  "Password must include at least one lowercase letter.";
const passwordUppercaseErr =
  "Password must include at least one uppercase letter.";
const passwordNumberErr = "Password must include at least one number.";
const passwordSpecialCharErr =
  "Password must include at least one special character.";

const memberErr = "must be the valid member code. Hint: 111.";
const adminErr = "must be the valid admin code. Hint: 888.";

const uniqueEmailErr = "Email already used";

const validateUser = [
  body("first_name")
    .trim()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 30 })
    .withMessage(`First name ${lengthErr}`),

  body("last_name")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 30 })
    .withMessage(`Last name ${lengthErr}`),

  body("username")
    .trim()
    .isLength({ min: 3, max: 15 })
    .withMessage(`Username ${lengthErr}`)
    .custom(async (value) => {
      const taken = await isUsernameTaken(value);
      if (taken) {
        throw new Error(uniqueErr);
      }
      return true;
    }),

  body("email")
    .trim()
    .isEmail()
    .withMessage(emailErr)
    .custom(async (value) => {
      const taken = await isEmailUsed(value);
      if (taken) {
        throw new Error(uniqueEmailErr);
      }
      return true;
    }),

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
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).render("./forms/sign-up", {
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
    const randomColor = await getRandomColor();
    await db.createUser({
      first_name,
      last_name,
      username: username.toLowerCase(),
      email,
      password: hashedPassword,
      is_member: isMemberValid,
      is_admin: isAdminValid,
      profile_color: randomColor,
    });
    console.log(getRandomColor);
    // res.render("index");
    res.redirect("/log-in");
  },
];

async function testing(req, res) {
  const color = await getRandomColor();
  res.send(color);
}

module.exports = {
  testing,
  signUpForm,
  usersCreatePost,
};
