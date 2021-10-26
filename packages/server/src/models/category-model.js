const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Genre name is required"],
    },
  },
  {
    strict: true,
    timestamps: true,
  },
);

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
