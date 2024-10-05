const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const indexRouter = require("./routes/index");
const {errors} = require("celebrate");
const {errorHandler} = require("./middlewares/error-handler");

// Port
const { PORT = 3001 } = process.env;

// Initialize the app
const app = express();


// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

  // Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/", indexRouter);

// Error handling
app.use(errors());
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
