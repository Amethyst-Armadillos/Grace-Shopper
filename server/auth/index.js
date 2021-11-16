const router = require("express").Router();
const {
  models: { User, Cart },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    console.log(user.id, 'this is the user iddd')
    user.addCart(await Cart.create());
    let cart = await Cart.findOne({
      order: [ [ 'id', 'DESC' ]],
      });
      console.log(cart, 'newww carrttt')
    user.update({currentCart: cart.id})
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
