const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const { UnauthorizedError } = require("../utils/errors");


const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");



  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
   return next(new UnauthorizedError("Invalid token"));
  }

};

module.exports = { auth };
