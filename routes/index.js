const router = require("express").Router();
const { celebrate } = require("celebrate");
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const NotFoundError = require("../utils/NotFoundError");
const { validateUser } = require("../middlewares/validation");

router.post("/signin", celebrate(validateUser), login);
router.post("/signup", celebrate(validateUser), createUser);

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
