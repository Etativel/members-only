const express = require("express");
const router = express();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const pool = require("../database/pool");
const bcrypt = require("bcryptjs");
const controller = require("../controllers/logInController");
const isAuth = require("../middlewares/authMiddleware").isAuth;
const isAdmin = require("../middlewares/authMiddleware").isAdmin;
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );

      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "No username found" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

router.get("/log-in", controller.getLoginForm);
router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/chat-room",
    failureRedirect: "/log-in",
    failureFlash: true,
  })
);
router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
