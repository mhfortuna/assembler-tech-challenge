const { searchController } = require("../controllers");
const Router = require("express").Router;

// const {
//   authFirebaseMiddleware,
// } = require("../middlewares/auth-firebase-middleware");

const searchRouter = Router();

searchRouter.get("/content", searchController.searchContent);

module.exports = {
  searchRouter,
};
