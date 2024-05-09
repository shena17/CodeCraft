const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const alaSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, ref: "User" },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  },
  {
    timestamps: true,
  }
);

const ALA = mongoose.model("ALA", alaSchema);
module.exports = ALA;
