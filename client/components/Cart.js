import React, { useState } from "react";

export const Cart = () => {
  const [cart, setCart] = useState([]);

  return (
    <div>
      <h1>Cart</h1>
      <button>
        <h3>Checkout</h3>
      </button>
    </div>
  );
};

export default Cart;
