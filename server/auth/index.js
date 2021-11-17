const router = require("express").Router();
const {
  models: { User, Cart },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    //Brad destructured this to protect against injection attacks.
    //the User.authenticate function returns a token if that username and PW are valid.
    const username = req.body.username;
    const password = req.body.password;
    res.send({
      token: await User.authenticate({
        username: username,
        password: password,
      }),
    });
  } catch (err) {
    next(err);
  }
});

//this returns an error that says user.setCart is not a function.
//That needs to be fixed still but I've destructured it to protect against injection attacks.

router.post("/signup", async (req, res, next) => {
  try {

    const username= req.body.username;
    const password = req.body.password;
    const user = await User.create({username: username, password: password});

    user.addCart(await Cart.create());
    let cart = await Cart.findOne({
      order: [ [ 'id', 'DESC' ]],
      });
    user.update({currentCart: cart.id})
    cart.userId = user.id

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
