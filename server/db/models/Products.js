const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DECIMAL,
  },
  stock: {
    type: Sequelize.INTEGER,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
});

module.exports = Product;
