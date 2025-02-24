const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    //Validation of Data
    validateSignUpData(req); // importing from utills --> validation.js
    //Encrypt the password

    const { firstName, lastName, emailId, password } = req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    //Cretaing a new instance of the USer model
    //Storing the user in the database
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    }); //Creating a new instance of a user model
    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    res.json({ message: "User Added Sucessfully", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Enter a valid Email Id");
    }

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Email ID not present in DataBase");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT(); //Create the JWT token getting it from usermodel

      // Add the token to a cookie with proper settings
      res.cookie("token", token, {
        httpOnly: true, // Prevent access from frontend JavaScript
        secure: true, // Only send over HTTPS (important for production)
        sameSite: "None", // Allow cross-origin cookies
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      });
      //

      res.snd(useer);
    } else {
      throw new Error("Incorrect Password");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});
authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, {
      //setting the cookie tyo null and the cookie will stop its function results in logout
      expires: new Date(Date.now()),
    })
    .send(req.body.firstName + " is Logout sucessfully"); //this is chaining hence res is not there
});

module.exports = authRouter;
