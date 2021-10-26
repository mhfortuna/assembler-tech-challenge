const { gifController } = require("../controllers");
const Router = require("express").Router;

const {
  authFirebaseMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const gifRouter = Router();

gifRouter.get("", authFirebaseMiddleware, gifController.get);

module.exports = {
  gifRouter,
};
