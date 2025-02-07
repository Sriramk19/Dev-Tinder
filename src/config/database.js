const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://sriramnmaster:fdXkfXAGOsP4tgZK@learningnode.sadoa.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
