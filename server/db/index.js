//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Products");
const Cart = require("./models/Cart");
//associations could go here!

User.belongsToMany(Product, { through: Cart });
Product.belongsToMany(User, { through: Cart });

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
  },
};
