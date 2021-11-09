const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {min: 0}
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {min: 0},
  },
  imageUrl: {
    type: Sequelize.STRING,
  }
});

module.exports = Product;
