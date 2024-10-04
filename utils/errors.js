// const ERROR_CODES = {
//   BAD_REQUEST: 400,
//   NOT_FOUND: 404,
//   UNAUTHORIZED: 401,
//   FORBIDDEN: 403,
//   INTERNAL_SERVER_ERROR: 500,
//   CONFLICT: 409,
// };

// const ERROR_MESSAGES = {
//   BAD_REQUEST: "Invalid data.",
//   NOT_FOUND: "couldnt find the requested resource.",
//   FORBIDDEN: "Access denied.",
//   INTERNAL_SERVER_ERROR: "An error has occurred on the server.",
//   EMAIL_ALREADY_EXISTS: "This email is already registered.",
//   CONFLICT: "Data already exists.",
//   UNAUTHORIZED: "Authorization required.",
// };

// module.exports = { ERROR_CODES, ERROR_MESSAGES };



class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};





