const { categoryController } = require("../controllers");
const Router = require("express").Router;

const categoryRouter = Router();

categoryRouter.get("", categoryController.get);

module.exports = {
  categoryRouter,
};
