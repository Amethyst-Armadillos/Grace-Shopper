const Product = require("../db/models/Products");
const {requireToken, isAdmin} = require("./gatekeepingMiddleware")

const {
  models: { User, CartItem, Cart },
} = require("../db");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireToken, isAdmin, async (req, res, next) => {
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

router.put("/edit/:id", requireToken, isAdmin, async (req, res, next) => {

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

router.post("/new", requireToken, isAdmin, async (req, res, next) => {
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
