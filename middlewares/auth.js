const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const { UNAUTHORIZED_ERROR_CODE } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED_ERROR_CODE).send({
      message: "Not authorized",
    });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return res.status(UNAUTHORIZED_ERROR_CODE).send({
      message: "Not authorized",
    });
  }

  req.user = payload;

  next();
};
