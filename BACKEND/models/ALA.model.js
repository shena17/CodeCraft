const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const alaSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, ref: "User" },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tags: [
      {
        _id: { type: Schema.Types.ObjectId, unique: true },
        tag: { type: Schema.Types.ObjectId, ref: "Tag" },
        count: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ALA = mongoose.model("ALA", alaSchema);
module.exports = ALA;
