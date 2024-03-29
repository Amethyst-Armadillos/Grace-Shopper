const {
  models: { User, CartItem, Cart, Product },
} = require("../db");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const cartData = await CartItem.findAll();
    res.send(cartData);
  } catch (error) {
    next(error);
  }
});

router.get('/guestCheckout', async (req, res, next) => {
  try {
    let cart =  await Cart.findOne({
      order: [["id", "DESC"]],
    });

    res.send(cart)
  } catch (error) {
    next(error)
  }

})


router.get("/history/:userId", async (req, res, next) => {
  try {
    const user = await Cart.findAll({
      where: { userId: req.params.userId },
    });
    let userArr = user.map((users) => users.id);

    const history = await CartItem.findAll({
      where: {
        fullFilled: true,
        cartId: userArr,
      },
    });
    res.send(history);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await Cart.create();
    let cart = await Cart.findOne({
      order: [["id", "DESC"]],
    });
    let Order = req.body.map((product) => {
      return {
        cartId: cart.id,
        fullFilled: product.fullFilled,
        imageUrl: product.imageUrl,
        name: product.name,
        price: product.price,
        productId: product.productId,
        quantity: product.quantity,
      };
    });

    Order.map(async (order) => {
      let product = await Product.findByPk(order.productId);
      let newStock = function notZero() {
        if (product.stock - order.quantity < 0) {
          return 0;
        } else {
          return product.stock - order.quantity;
        }
      };
      await product.update({ stock: newStock() });
      await CartItem.create(order);
    });

    res.send(Order);
  } catch (error) {
    next(error);
  }
});

//Adds product to cart, first arg is product id, second is user id, third is quantity
router.put("/addproduct", async (req, res, next) => {
  try {
    let product = await Product.findByPk(req.body.productId);
    let quantity = req.body.quantity;
    let user = await User.findByPk(req.body.userId);
    let currentCart = user.currentCart;
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
  } catch (error) {
    next(error);
  }
});

//Returns the cart of the user given userId
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const currentCart = user.currentCart;
    if (!user) {
      res.status(404).send("User not found");
    }
    const cart = await Cart.findByPk(currentCart, {
      include: { model: CartItem },
    });

    const cartItems = await CartItem.findAll({
      where: { cartId: cart.id, fullFilled: false },
    });
    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});

router.delete("/:cartId/:pId", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { currentCart: req.params.cartId },
    });
    const cartProduct = await CartItem.findOne({
      where: { productId: req.params.pId, cartId: user.currentCart },
    });
    await cartProduct.destroy();
    res.json(cartProduct);
  } catch (error) {
    next(error);
  }
});

//increases the product count in the cart by one
router.put("/:cartId/:productId", async (req, res, next) => {
  try {
    //update the amount in the cart model.
    const cartId = req.params.cartId;

    const productId = req.params.productId;
    const newQuantity = req.body.quantity;
    if (req.params.cartId !== "null" && newQuantity >= 1) {
      await CartItem.update(
        { quantity: newQuantity },
        { where: { cartId: cartId, productId: productId } }
      );
      //then send back all the data to rerender
      const cartData = await CartItem.findAll({
        where: { cartId: cartId, fullFilled: false },
      });
      res.send(cartData);
    } else {
      await CartItem.update(
        { quantity: newQuantity },
        { where: { cartId: null, productId: productId } }
      );
      //then send back all the data to rerender
      const cartData = await CartItem.findAll({
        where: { cartId: cartId, fullFilled: false },
      });
      res.send(cartData);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    //update the amount in the cart model.
    if (req.params.id != "null") {
      const user = await User.findByPk(req.params.id);

      const cart = await Cart.findAll({
        where: { userId: req.params.id, id: user.currentCart },
      });

      let cartData = await CartItem.findAll({
        where: { cartId: user.currentCart },
      });

      cartData.map(async (order) => {
        let product = await Product.findByPk(order.productId);

        let newStock = function notZero() {
          if (product.stock - order.quantity < 0) {
            return 0;
          } else {
            return product.stock - order.quantity;
          }
        };

        await product.update({ stock: newStock() });
      });

      cartData.map(async (item) => {
        await item.update({ fullFilled: true });
      });
      await Cart.create();
      let newCart = await Cart.findOne({
        order: [["id", "DESC"]],
      });

      user.update({ currentCart: newCart.id });
      newCart.update({ userId: user.id });

      res.send(
        cartData.filter((cart) => {
          cart.fullFilled != true;
        })
      );
    } else {
      const cartData = await CartItem.findAll({ where: { cartId: null } });

      cartData.map(async (item) => {
        await item.update({ fullFilled: true });
      });

      res.send(
        cartData.filter((cart) => {
          cart.fullFilled != true;
        })
      );
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;
