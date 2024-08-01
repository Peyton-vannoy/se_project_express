const router = require("express").Router();
const { createUser, login } = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", createUser);

module.exports = router;
