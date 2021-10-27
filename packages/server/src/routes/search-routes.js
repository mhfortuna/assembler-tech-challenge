const { searchController } = require("../controllers");
const Router = require("express").Router;

const searchRouter = Router();

searchRouter.get("/content", searchController.searchContent);

module.exports = {
  searchRouter,
};
