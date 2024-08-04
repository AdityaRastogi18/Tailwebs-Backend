require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/connection");
// const urlRouter = require("./routes/url");
// const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const studentRouter = require("./routes/student");
const configurePassport = require("./config/passport");
const passport = require("passport");
// Connection
connectDB();

const app = express();

// app.set("view engine", "ejs");
// app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extends: false }));
app.use(express.json());

app.use(passport.initialize());
configurePassport(passport);

app.use("/", userRouter);
app.use("/student", studentRouter);

app.listen(3002, () => {
  console.log("server has started");
});
