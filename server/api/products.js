const router = require('express').Router()
const Product = require("../db/models/Products")

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
