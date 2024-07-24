const User = require("../models/user");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }));
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
  const { name, avatar } = req.body;

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

module.exports = { getUsers, getUser, createUser };
