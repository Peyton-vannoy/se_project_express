const router = require("express").Router();
const { getCurrentUser, updateUserProfile } = require("../controllers/users");

router.get("/users/me", getCurrentUser);
router.patch("/users/me", updateUserProfile);

module.exports = router;
