const mongoose = require("mongoose");

// Define the Mylist schema
const mylistSchema = new mongoose.Schema({
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  tutorialsRef: [{ type: mongoose.Schema.Types.ObjectId, 
    ref: "TutorialsUser",
    required: true,
}],
});

// Create the Mylist model
const Mylist = mongoose.model("Mylist", mylistSchema);

module.exports = Mylist;