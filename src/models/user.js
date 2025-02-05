const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      index: true,
      minLength: 3,
      maxLength: 15,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true, //To make the email unique
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        //validating for a strong password
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong Password:" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      enum: {
        values: ["male", "female", "others"],
        message: "{Value is not a valid gender type",
      },
      type: String,
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is not Valid");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL:" + value);
        }
      },
    },
    about: {
      type: String,
      default: "this is a default value of the user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

userSchema.methods.validatePasswordChange = async function (
  passwordInputByUser
) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordMatch = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordMatch;
};

const User = mongoose.model("User", userSchema); // The model name should start with a capital letter
module.exports = User;
