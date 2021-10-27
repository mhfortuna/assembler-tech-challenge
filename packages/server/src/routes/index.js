const { authRouter } = require("./auth-routes");
const { contentRouter } = require("./content-routes");
const { categoryRouter } = require("./category-routes");
const { searchRouter } = require("./search-routes");

module.exports = {
  authRouter,
  contentRouter,
  categoryRouter,
  searchRouter,
};
