//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Products");
const Cart = require("./models/Cart");
const CartItem = require("./models/CartItem");
//associations could go here!

//User has one cart, Cart belongs to one User
//Always want to create empty cart for new user
//Can use User.getCart() to get cart
// User.belongsTo(Cart);
// Cart.hasOne(User);

User.hasMany(Cart);
Cart.belongsTo(User);

//cartItem belongs to one cart
//to create a cart item must use product's id
//Can use Cart.getCartItems() to get all cart items
//Can use Cart.addCartItems(CartItem) to add a cart item
//Can use Cart.removeCartItems(CartItem) to remove a cart item
Cart.hasMany(CartItem);

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    CartItem,
  },
};
