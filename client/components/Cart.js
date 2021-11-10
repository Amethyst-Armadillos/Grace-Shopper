import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Cart = () => {
  const [cart, setCart] = useState([]);

  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    axios.get(`/api/users/${userId}`).then((response) => {
      setCart(response.data);
    });
  }, []);

  let mappedCart;

  if (cart.products) {
    mappedCart = cart.products.map((product) => {
      return (
        <div key={product.id}>
          <p>Product: {product.name}</p>
          <p>Price: {product.price}</p>
          Qty:
          <select>
            <option></option>
          </select>
        </div>
      );
    });
  }

  return (
    <div>
      <h1>Cart</h1>
      <div>{mappedCart}</div>
      <button>
        <h3>Checkout</h3>
      </button>
    </div>
  );
};

export default Cart;
