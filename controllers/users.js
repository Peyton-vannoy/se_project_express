const User = require("../models/user");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");
const bcrypt = require("bcrypt");

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() =>
      res
        .catch(() =>
          res
            .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR })
        )
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

  if (!email) {
    return res.status(ERROR_CODES.BAD_REQUEST).send({
      message: "An email address is required",
    });
  }

  return User.findOne({ email })
    .then((existingEmail) => {
      if (existingEmail) {
        const error = new Error(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
        error.code = 11000;
        throw error;
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res
        .status(201)
        .send({ name: user.name, email: user.email, avatar: user.avatar })
    )
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(ERROR_CODES.CONFLICT).send({
          message: ERROR_MESSAGES.CONFLICT,
        });
      }
      if (err.name === "ValidationError") {
        return res.status(ERROR_CODES.BAD_REQUEST).send({
          message: ERROR_MESSAGES.BAD_REQUEST,
        });
      }
      return res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).send({
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    });
};

module.exports = { getUsers, getUser, createUser };
