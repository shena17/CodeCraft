const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const resourceSchema = new Schema(
  {
    type: {
      type: String,
    },
    source: {
      type: String,
    },
    heading: {
      type: String,
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  },
  {
    timestamps: true,
  }
);

const ResourcesUser = mongoose.model("ResourcesUser", resourceSchema);
module.exports = ResourcesUser;
