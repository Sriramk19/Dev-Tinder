const express = require("express");
const connectDB = require("./config/database"); //Connecting to the cluster in db and getting the connectDB from database.js
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "https://dev-tinder-web-rust.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

connectDB() //To ensure data is stored in the database, the database connection from database.js must be established before starting the server.
  .then(() => {
    console.log("Databse connection establised...");
    app.listen(7777, () => {
      console.log("server is listeneing");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!!!");
  });
