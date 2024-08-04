const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");
const bcrypt = require("bcrypt");

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(ERROR_CODES.BAD_REQUEST)
      .send({ message: ERROR_MESSAGES.BAD_REQUEST });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => {
      res.status(ERROR_CODES.UNAUTHORIZED).send({
        message: ERROR_MESSAGES.INVALID_CREDENTIALS,
      });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(ERROR_CODES.BAD_REQUEST).send({
          message: ERROR_MESSAGES.BAD_REQUEST,
        });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(ERROR_CODES.NOT_FOUND).send({
          message: ERROR_MESSAGES.NOT_FOUND,
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
        throw new Error("Email already exists");
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
          message: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
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

//PATCH /users/me
const updateUserProfile = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(ERROR_CODES.NOT_FOUND).send({
          message: ERROR_MESSAGES.USER_NOT_FOUND,
        });
      }
      return res.status(200).send({ data: updatedUser });
    })
    .catch((err) => {
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

module.exports = { getCurrentUser, createUser, login, updateUserProfile };
