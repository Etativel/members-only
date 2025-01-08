const express = require("express");
const router = express();
const signUpController = require("../controllers/singUpController");
router.use(express.urlencoded({ extended: true }));

router.get("/sign-up", signUpController.signUpForm);
router.post("/sign-up", signUpController.usersCreatePost);

module.exports = router;
