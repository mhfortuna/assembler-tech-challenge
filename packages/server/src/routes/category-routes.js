const { categoryController } = require("../controllers");
const Router = require("express").Router;

// const {
//   authFirebaseMiddleware,
// } = require("../middlewares/auth-firebase-middleware");

const categoryRouter = Router();

categoryRouter.get("", categoryController.get);

module.exports = {
  categoryRouter,
};
