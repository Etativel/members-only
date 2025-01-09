require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const path = require("node:path");
const assetPath = path.join(__dirname, "public");
const signUpRouter = require("./routes/signUpRoute");
const logInRouter = require("./routes/authRoute");
const chatRouter = require("./routes/messageRoute");
const session = require("./config/sessionConfig");
const messageDb = require("./database/messagesQuery");

session(app);

app.use(express.static(assetPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", signUpRouter);
app.use("/", logInRouter);
app.use("/", chatRouter);
app.get("/", async (req, res) => {
  try {
    const messages = await messageDb.getAllMessage();
    res.render("index", { user: req.user, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("An error occurred while loading messages.");
  }
});

const PORT = 3000;

app.listen(3000, () => console.log("App listening to port ", PORT));
