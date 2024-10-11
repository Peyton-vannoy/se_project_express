const router = require("express").Router();
const { getCurrentUser, updateUserProfile } = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const { validateUser } = require("../middlewares/validation");
const { celebrate } = require("celebrate");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, celebrate(validateUser), updateUserProfile);

module.exports = router;
