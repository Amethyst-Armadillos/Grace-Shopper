const { INTEGER } = require("sequelize");
const Sequelize = require("sequelize");
const db = require("../db");

const CartItem = db.define("cartItem", {
  quantity: {
    type: INTEGER,
    notNull: true,
    min: 0,
  },
  productId: {
    type: INTEGER,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: { min: 0 },
  },
  imageUrl: {
    type: Sequelize.TEXT,
  },
});

module.exports = CartItem;
