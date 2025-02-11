const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://sriramnmaster:WIxjVdKHzUUJYyrX@learningnode.sadoa.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
