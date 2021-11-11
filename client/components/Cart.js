import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Cart = () => {
  const [cart, setCart] = useState([]);

  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    axios.get(`/api/cart/${userId}`).then((response) => {
      setCart(response.data);
      console.log("response data", response.data);
    });
    //console.log(cart);
    // async function fetchData() {
    //   return await axios.get(`/api/cart/${userId}`);
    // }
    // const cartItems = fetchData();
    // console.log(cartItems);
    // setCart(cartItems.PromiseResult.data);

    //console.log(cart);
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
