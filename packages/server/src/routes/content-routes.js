const { contentController } = require("../controllers");
const Router = require("express").Router;

const {
  authFirebaseMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const contentRouter = Router();

contentRouter.get("", contentController.get);
contentRouter.post("", authFirebaseMiddleware, contentController.add);

module.exports = {
  contentRouter,
};
