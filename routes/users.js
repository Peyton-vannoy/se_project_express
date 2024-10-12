const router = require("express").Router();
const { celebrate } = require("celebrate");
const { getCurrentUser, updateUserProfile } = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const { validateUser } = require("../middlewares/validation");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, celebrate(validateUser), updateUserProfile);

module.exports = router;
