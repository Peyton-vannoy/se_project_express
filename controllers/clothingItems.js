const clothingItem = require("../models/clothingItem");
const { BadRequestError, ForbiddenError, NotFoundError } = require("../utils/errors");

const getItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((items) => res.send({ data: items }))
    .catch(next);
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  if (!name || !weather || !imageUrl) {
    next(new BadRequestError("Invalid data"));
  }

  return clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  clothingItem
    .findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== userId) {
        throw new ForbiddenError("You do not have permission to delete this item");
      }
      return clothingItem
        .findByIdAndDelete(itemId)
        .then(() =>
          res.status(200).send({ message: "Successfully deleted item" })
        );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next( new BadRequestError("Invalid item ID"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(err);
      }
    });
};

const likeItem = (req, res, next) => {
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
    .then((item) => {
      res.json({ data: item });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(err);
      }
    });
};

const dislikeItem = (req, res, next) => {
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
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
