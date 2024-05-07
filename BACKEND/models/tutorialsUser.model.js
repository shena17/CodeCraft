const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const tutorialSchema = new Schema(
  {
    tutorialid: {
      type: String,
    },
    videos: [{ type: String }],
    attach: {
      type: String,
    },

    heading: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  },
  {
    timestamps: true,
  }
);

const TutorialsUser = mongoose.model("TutorialsUser", tutorialSchema);
module.exports = TutorialsUser;
