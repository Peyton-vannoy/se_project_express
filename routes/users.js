const router = express.Router();

const User = require("../models/user");
router.get("/users", (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Error: Cant find user" }));
});

router.get("/users/:userId", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(500).send({ message: "Error: Couldn't find Id" })
    );
});

router.post("/users", (req, res) => {
  const { name, about } = req.body;
  User.create({ name, about });
});
