import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Cart = () => {
  const [cart, setCart] = useState([]);

  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    if (userId) {
      axios.get(`/api/cart/${userId}`).then((response) => {
        setCart(response.data);
        console.log("response data", response.data);
      });
    } else {
      axios.get(`/api/products/guest`).then((response) => {
        console.log(response, "wooooooghoooooo");
        setCart(response.data);
      });
    }

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

  if (cart) {
    mappedCart = cart.map((product) => {
      return (
        <div key={product.id}>
          <p>{product.name}</p>
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
    <div className='cart-container'>
      <div className='cart-header'>
        <h3 className='cart-title'>Shopping Cart</h3>
        <h5 className='cart-action'>Remove all</h5>
      </div>

      <div>{mappedCart}</div>
      <h2>total</h2>
      <button>
        <h3>Purchase</h3>
      </button>
    </div>
  );
};

export default Cart;

// //<div class=”Header”>
//  <h3 class=”Heading”>Shopping Cart</h3>
//  <h5 class=”Action”>Remove all</h5>
//  </div>
