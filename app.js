require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const path = require("node:path");
const assetPath = path.join(__dirname, "public");
const signUpRouter = require("./routes/signUpRoute");
const logInRouter = require("./routes/loginRoute");
const messageRouter = require("./routes/messageRoute");
const session = require("./config/sessionConfig");
const messageDb = require("./database/messagesQuery");
const chatRoomRouter = require("./routes/chatRoom");
const membershipRouter = require("./routes/membershipRoute");
session(app);
const flash = require("connect-flash");
app.use(express.static(assetPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(flash());

app.use("/", signUpRouter);
app.use("/", logInRouter);
app.use("/", messageRouter);
app.use("/", chatRoomRouter);
app.use("/", membershipRouter);
app.use((req, res, next) => {
  res.locals.errorMessage = req.flash("error");
  next();
});

app.get("/", (req, res) => {
  if (!req.user) {
    return res.redirect("/log-in");
  }
  res.redirect("/chat-room");
});

const PORT = 3000;

app.listen(3000, () => console.log("App listening to port ", PORT));
