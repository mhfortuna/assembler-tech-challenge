const userModel = require("./user-model");
const categoryModel = require("./category-model");
const contentModel = require("./content-model");

module.exports = {
  User: userModel,
  Category: categoryModel,
  Content: contentModel,
};
