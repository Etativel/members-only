const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const pool = require("../database/pool");

module.exports = function (app) {
  app.use(
    expressSession({
      store: new pgSession({
        pool,
        tableName: "user_sessions",
        createTableIfMissing: true,
      }),

      secret: process.env.FOO_COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    })
  );
};
