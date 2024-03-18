const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newUser = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      requied: true,
    },
    password: {
      type: String,
      requied: true,
    },
    role: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", newUser);

module.exports = User;
