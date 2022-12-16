const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    textBody: {
      type: {},
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
