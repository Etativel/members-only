require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const path = require("node:path");
const assetPath = path.join(__dirname, "public");
const signUpRouter = require("./routes/signUpRoute");

app.use(express.static(assetPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", signUpRouter);

app.get("/", (req, res) => {
  res.render("index");
});

const PORT = 3000;

app.listen(3000, () => console.log("App listening to port ", PORT));
