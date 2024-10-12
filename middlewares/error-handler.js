const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500 ? "An error has occurred on the server." : err.message;
  return res.status(statusCode).send({ message });
};

module.exports = { errorHandler };
