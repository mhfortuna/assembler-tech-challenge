const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const contentSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "A title is required"],
    },
    type: {
      type: String,
      enum: ["gif", "meme"],
      required: [true, "type of content is required"],
    },
    url: {
      type: String,
      trim: true,
      required: [true, "url is required"],
      validate: {
        validator: (value) => validator.isURL(value),
        message: () => `URL is not valid`,
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User id is required"],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: [true, "Category id is required"],
    },
  },
  {
    strict: false,
    timestamps: true,
  },
);

const Content = mongoose.model("content", contentSchema);

module.exports = Content;
