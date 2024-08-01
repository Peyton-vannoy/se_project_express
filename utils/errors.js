const ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNAUTHORIZED_ERROR_CODE: 401,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
  BAD_REQUEST: "Invalid data.",
  NOT_FOUND: "Data not found.",
  INTERNAL_SERVER_ERROR: "An error has occurred on the server.",
  UNAUTHORIZED_ERROR: "You are not authorized.",
};

module.exports = { ERROR_CODES, ERROR_MESSAGES };
