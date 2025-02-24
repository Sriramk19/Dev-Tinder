const express = require("express");
const connectDB = require("./config/database"); //Connecting to the cluster in db and getting the connectDB from database.js
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://dev-tinder-web-rust.vercel.app",
      "https://your-production-domain.vercel.app",
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
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
  })
  .catch((err) => {
    console.log("Database cannot be connected!!!");
  });

// Export app for Vercel
module.exports = app;
