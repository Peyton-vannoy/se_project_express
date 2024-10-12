const router = require("express").Router();
const { getCurrentUser, updateUserProfile } = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const { validateUpdateUser } = require("../middlewares/validation");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUpdateUser, updateUserProfile);

module.exports = router;
