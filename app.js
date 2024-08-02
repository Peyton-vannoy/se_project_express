const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const { authMiddleware } = require("./middlewares/auth");
const cors = require("cors");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch();

app.use((req, res, next) => {
  if (
    req.path === "/signin" ||
    req.path === "/signup" ||
    req.path === "/items"
  ) {
    return next();
  }
  authMiddleware(req, res, next);
});

app.use(cors());

app.use(express.json());
app.use("/", indexRouter);

app.listen(PORT, () => {});
