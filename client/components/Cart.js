import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Cart = () => {
  const [cart, setCart] = useState([]);

  const userId = useSelector((state) => state.auth.id);
//the below checks to see if a user is logged in.  If so, it returns their user-specific cart. Otherwise, it returns the cart currently assigned to "guest".
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

  const decrementCount = (e) => {
    axios.put('/api/cart/1/6', {quantity:200});
  };

  const incrementCount = function (cartId, productId) {
    axios.put(`/api/cart/${cartId}/${productId}`, {quantity:100000});
    };


  let mappedCart;

  if (cart) {
    mappedCart = cart.map((product) => {
      return (
        <div key={product.id} className="cart-items">
          <div className="image-box">
            <img className="cart-images" src={product.imageUrl}></img>
          </div>
          <div className="about">
            <h1 className="title">{product.name}</h1>
          </div>
          <div className="cart-counter">
            <button className="cart-counter-btn" onClick ={() => decrementCount()} >-</button>
            <div className="cart-count">{product.quantity}</div>
            <button className="cart-counter-btn" onClick ={() => incrementCount(product.cartId,product.productId)} >+</button>
          </div>
          <div className="cart-prices">
            <div className="cart-amount">${product.price}</div>
            <div className="cart-remove">Remove</div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h3 className="cart-title">Shopping Cart</h3>
        <h5 className="cart-action">Remove all</h5>
      </div>

      <div>{mappedCart}</div>
      <div className="checkout">
        <div className="total">
          <div>
            <div className="subtotal">Sub-Total</div>
            <div className="items">2 bouquets</div>
            <div className="total-amount">$6.00</div>
          </div>
        </div>
        <button className = 'checkout-button'>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;

// //<div class=”Header”>
//  <h3 class=”Heading”>Shopping Cart</h3>
//  <h5 class=”Action”>Remove all</h5>
//  </div>
