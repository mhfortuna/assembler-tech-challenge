const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const {
  authRouter,
  contentRouter,
  categoryRouter,
  searchRouter,
} = require("./routes");

// const {
// } = require("./routes");

const app = express();

app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/content", contentRouter);
app.use("/api/category", categoryRouter);
app.use("/api/search", searchRouter);

module.exports = app;
