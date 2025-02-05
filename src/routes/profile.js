const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const bcrypt = require("bcrypt");

const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user; // the user is added tot eh req . body in the ,iddleware ie. userAuth

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    console.log("Working");
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit request");
    }
    //req.user -> existing user
    //res.user -> updated user details
    const loggedInUser = req.user; //new data
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    console.log("task Done");
    res.status(200).json({ message: "Profile updated successfully" });

    //const user = req.user;
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

//Change password
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    if (!password || !newPassword) {
      return res
        .status(400)
        .send("Both current password and new password are required.");
    }

    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Password is weak");
    }

    const user = req.user;
    const isPasswordMatch = await user.validatePasswordChange(password);
    if (!isPasswordMatch) {
      throw new Error("Password does not match");
    }

    const newHashPassword = await bcrypt.hash(newPassword, 10);

    user.password = newHashPassword;
    await user.save();
    res.send("Password Updated ");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

module.exports = profileRouter;
