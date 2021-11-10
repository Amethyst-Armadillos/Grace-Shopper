


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

router.delete("/:securityLevel/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    const securityLevel = req.params.securityLevel;
    if (securityLevel === 'admin'){
      const deleteProduct = await Product.destroy({ where: { id: productId } });
    }

    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let product = await Product.findByPk(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

//is this for the cart? who made this one below?
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

router.put("/:securityLevel/:Id", async (req, res, next) => {
  try{
    if(req.params.securityLevel === "admin"){
    const product = await Product.findByPk(req.params.Id);
    res.send(await product.update(req.body));
    }
  } catch(error) {
    next(error)
  }
})



module.exports = router;
