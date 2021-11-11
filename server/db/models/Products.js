const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: 0 },
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 0 },
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://images.unsplash.com/photo-1585157603209-378be66bede1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=912&q=80",
  },
});

module.exports = Product;
