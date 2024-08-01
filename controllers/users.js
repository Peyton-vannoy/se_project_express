const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../utils/config");

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() =>
      res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR })
    );
};

// GET /usersId
const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(ERROR_CODES.NOT_FOUND).send({
          message: ERROR_MESSAGES.NOT_FOUND,
        });
      }

      if (err.name === "CastError") {
        return res.status(ERROR_CODES.BAD_REQUEST).send({
          message: ERROR_MESSAGES.BAD_REQUEST,
        });
      }

      return res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).send({
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    });
};

// POST /createUser
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
    })
    .catch((err) => {
      res.status(ERROR_CODES.UNAUTHORIZED_ERROR_CODE).send({
        message: ERROR_MESSAGES.UNAUTHORIZED_ERROR,
      });
    });

  User.create({ name, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODES.BAD_REQUEST).send({
          message: ERROR_MESSAGES.BAD_REQUEST,
        });
      } else {
        res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).send({
          message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
      }
    });
};

//Login Controller
const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      res.status(ERROR_CODES.UNAUTHORIZED_ERROR_CODE).send({
        message: ERROR_MESSAGES.UNAUTHORIZED_ERROR,
      });
    });
};

module.exports = { getUsers, getUser, createUser, login };
