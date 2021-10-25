const { authController } = require("../controllers");
const Router = require("express").Router;

const {
  authFirebaseMiddleware,
  authRegisterMiddleware,
} = require("../middlewares/auth-firebase-middleware");

const authRouter = Router();

authRouter.post("/register", authRegisterMiddleware, authController.signUp);
authRouter.get("/authenticate", authFirebaseMiddleware, authController.signIn);

module.exports = {
  authRouter,
};
