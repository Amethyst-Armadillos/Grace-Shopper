const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const Product = require("../db/models/Products");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let user = await User.findAll({
      where: { id: req.params.id },
      attributes: ["id", "username", "email", "securityLevel"],
      include: [{ model: Product }],
    });
    res.send(user[0]);
  } catch (err) {
    next(err);
  }
});
