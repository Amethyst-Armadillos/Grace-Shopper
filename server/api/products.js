

const Product = require("../db/models/Products")
const router = require("express").Router();



router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res ,next) => {
  try {
    console.log('helllloooo there')
    let product = await Product.findByPk(req.params.id)
    res.send(product);
  } catch (error) {
    next(error)
  }
})

module.exports = router

