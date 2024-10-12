const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const { errors } = require("celebrate");
const helmet = require("helmet");
const limiter = require("./middlewares/rate-limiter");
const indexRouter = require("./routes/index");
const { errorHandler } = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

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
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://wtwr.ohbah.com",
      "https://api.wtwr.ohbah.com",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(limiter);

// RequestLogger
app.use(requestLogger); // enable requestLogger before Route handlers

// Crash Test
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Routes
app.use("/", indexRouter);

// ErrorLogger
app.use(errorLogger); // enable errorLogger after Routes but before error handling

// Error handling
app.use(errors());
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
