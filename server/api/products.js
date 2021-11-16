const Product = require("../db/models/Products");
const {
  models: { User, CartItem, Cart },
} = require("../db");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    const deleteProduct = await Product.destroy({ where: { id: productId } });
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/guest", async (req, res, next) => {
  let cartProduct = await CartItem.findAll({
    where: { cartId: null, fullFilled: false },
  });
  res.send(cartProduct);
});

router.get("/:id", async (req, res, next) => {
  try {
    let product = await Product.findOne({ where: { id: req.params.id } });
    res.send(product);
  } catch (error) {
    next(error);
  }
});

//Adds product to cart, first arg is product id, second is user id, third is quantity
router.put("/:id", async (req, res, next) => {
  try {
    let params = req.params.id.split(",");
    let product = await Product.findByPk(params[0]);
    let quantity = params[2];
    if (params[1] !== "") {
      let user = await User.findByPk(params[1]);
      let currentCart = user.currentCart;
      console.log(currentCart, 'this is the current cart')
      let cart = await Cart.findByPk(currentCart);
      let previousItems = await cart.getCartItems();
      for (let i = 0; i < previousItems.length; i++) {
        if (
          previousItems[i].productId === product.id &&
          previousItems[i].fullFilled === false
        ) {
          let newQuantity =
            parseInt(previousItems[i].quantity) + parseInt(quantity);
          await previousItems[i].update({ quantity: newQuantity });
          return res.send(previousItems[i]);
        }
      }
      let cartItem = await CartItem.create({
        quantity,
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      });
      cart.addCartItem(cartItem);
      res.send(cart);
    } else {
      let previousItems = await CartItem.findAll({ where: { cartId: null } });
      for (let i = 0; i < previousItems.length; i++) {
        if (
          previousItems[i].productId === product.id &&
          previousItems[i].fullFilled === false
        ) {
          let newQuantity =
            parseInt(previousItems[i].quantity) + parseInt(quantity);
          await previousItems[i].update({ quantity: newQuantity });
          return res.send(previousItems[i]);
        }
      }

      let cartItem = await CartItem.create({
        quantity,
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      });

      res.send(cartItem);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/edit/:id", async (req, res, next) => {
  try {
    //Brad destructured this to protect against injection attacks.
    const price = req.body.price;
    const name = req.body.name;
    const stock = req.body.stock;
    const imageUrl = req.body.imageUrl;

    const product = await Product.findByPk(req.params.id);
    res.send(
      await product.update({
        price: price,
        name: name,
        stock: stock,
        imageUrl: imageUrl,
      })
    );
  } catch (error) {
    next(error);
  }
});

router.post("/new", async (req, res, next) => {
  try {
    //Brad destructured this to protect against injection attacks.
    const price = req.body.price;
    const name = req.body.name;
    const stock = req.body.stock;
    const imageUrl = req.body.imageUrl;
    const product = await Product.create({
      price: price,
      name: name,
      stock: stock,
      imageUrl: imageUrl,
    });
    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
