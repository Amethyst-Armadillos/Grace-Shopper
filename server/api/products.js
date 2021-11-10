

const Product = require("../db/models/Products")
const {
  models: { User },
} = require("../db");


const router = require("express").Router();



router.get("/", async (req, res, next) => {
  try {
    console.log(Object.keys(User.prototype))
    console.log()
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

router.put("/:id", async (req, res, next) => {

  try {
    let params = req.params.id.split(',')
    let user = await User.findByPk(params[1])
    let product = await Product.findByPk(params[0])
    console.log(user, product)

    user.addProduct(product)

  } catch (error) {
    next(error)
  }
})

module.exports = router

