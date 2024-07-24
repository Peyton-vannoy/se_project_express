const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch();

app.use((req, res, next) => {
  req.user = {
    _id: "669d19bf0aa562d746d3a9b4",
  };
  next();
});
app.use(express.json());
app.use("/", indexRouter);

app.listen(PORT, () => {});
