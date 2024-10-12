const router = require("express").Router();
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

router.post("/", validateClothingItem, createItem);

router.delete("/:itemId", validateItemId, deleteItem);

router.put("/:itemId/likes", validateItemId, likeItem);

router.delete("/:itemId/likes", validateItemId, dislikeItem);

module.exports = router;
