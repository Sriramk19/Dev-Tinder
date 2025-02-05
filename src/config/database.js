const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://sriramnmaster:qBT4pUFK4RgznNLR@learningnode.sadoa.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
