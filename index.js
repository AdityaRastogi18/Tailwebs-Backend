require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connection");
const userRouter = require("./routes/user");
const studentRouter = require("./routes/student");
const configurePassport = require("./config/passport");
const passport = require("passport");

connectDB();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.options(
  "*",
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.urlencoded({ extends: false }));
app.use(express.json());

app.use(passport.initialize());
configurePassport(passport);

app.use("/", userRouter);
app.use("/student", studentRouter);

app.listen(PORT || 3002, () => {
  console.log("server has started");
});
