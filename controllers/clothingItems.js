const clothingItem = require("../models/clothingItem");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");

const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.send({ data: items }))
    .catch(() =>
      res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).send({
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      })
    );
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  if (!name || !weather || !imageUrl) {
    return res
      .status(ERROR_CODES.BAD_REQUEST)
      .send({ message: ERROR_MESSAGES.BAD_REQUEST });
  }

  return clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(200).send({ data: item }))
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

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  clothingItem
    .findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== userId) {
        return res
          .status(ERROR_CODES.FORBIDDEN)
          .send({ message: ERROR_MESSAGES.FORBIDDEN });
      }
      return clothingItem
        .findByIdAndDelete(itemId)
        .then(() =>
          res.status(200).send({ message: "Successfully deleted item" })
        );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.BAD_REQUEST });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND });
      }
      return res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    });
};

const likeItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      {
        $addToSet: { likes: req.user._id },
      },
      {
        new: true,
      }
    )
    .orFail()
    .then((item) => res.json({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.BAD_REQUEST });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND });
      }

      return res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).send({
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    });
};

const dislikeItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      {
        $pull: { likes: req.user._id },
      },
      {
        new: true,
      }
    )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.BAD_REQUEST });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND });
      }
      return res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).send({
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
