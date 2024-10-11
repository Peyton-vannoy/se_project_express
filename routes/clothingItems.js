const router = require("express").Router();
const { celebrate } = require("celebrate");
const { auth } = require("../middlewares/auth");
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const {
  validateClothingItem,
  validateItemId,
} = require("../middlewares/validation");

router.get("/", getItems);

router.use(auth);

router.post("/", celebrate(validateClothingItem), createItem);

router.delete("/:itemId", celebrate(validateItemId), deleteItem);

router.put("/:itemId/likes", celebrate(validateItemId), likeItem);

router.delete("/:itemId/likes", celebrate(validateItemId), dislikeItem);

module.exports = router;
