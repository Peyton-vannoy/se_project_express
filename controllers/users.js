const User = require("../models/user");

//GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({
        message: err.message || "Error: Couldn't find users. Please try again.",
      });
    });
};

//GET /usersId
const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: err.message || "Error: Couldn't find user. Please try again.",
      });
    });
};

//POST /createUser
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message:
          err.message || "Error: Couldn't create new user. Please try again.",
      });
    });
};

module.exports = { getUsers, getUser, createUser };
