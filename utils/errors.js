const ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409,
};

const ERROR_MESSAGES = {
  BAD_REQUEST: "Invalid data.",
  USER_NOT_FOUND: "User not found.",
  FORBIDDEN: "Access denied.",
  INTERNAL_SERVER_ERROR: "An error has occurred on the server.",
  EMAIL_ALREADY_EXISTS: "This email is already registered.",
  CONFLICT: "Data already exists.",
  INVALID_CREDENTIALS: "Invalid email or password.",
};

module.exports = { ERROR_CODES, ERROR_MESSAGES };
