import axios from "axios";
import { use } from "chai";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Cart = () => {
  const [cart, setCart] = useState([]);

  //the below checks to see if a user is logged in.  If so, it returns their user-specific cart. Otherwise, it returns the cart currently assigned to "guest".

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios.get(`/api/cart/${userId}`).then((response) => {
        setCart(response.data);
      });
    } else {
      axios.get(`/api/products/guest`).then((response) => {
        setCart(response.data);
      });
    }
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/cart/${id}`);
    setCart(cart.filter((product) => product.id != id));
  };

  const decrementCount = function (cartId, productId, quantity) {
    let newQuantity = (quantity -= 1);
    axios
      .put(`/api/cart/${cartId}/${productId}`, { quantity: newQuantity })
      .then((response) => {
        setCart(response.data);
      });
  };

  const incrementCount = function (cartId, productId, quantity) {
    let newQuantity = (quantity += 1);
    axios
      .put(`/api/cart/${cartId}/${productId}`, { quantity: newQuantity })
      .then((response) => {
        setCart(response.data);
      });
  };

  const handleCheckOut = (id) => {
    console.log('hellooo', id)
    axios.put(`/api/cart/${id}`).then((response) => {
      console.log(response)
      setCart(response.data)
    })
  }

  let mappedCart;

  if (cart) {
    if (cart.length != 0) {
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
              <button
                className="cart-counter-btn"
                onClick={() =>
                  decrementCount(
                    product.cartId,
                    product.productId,
                    product.quantity
                  )
                }
              >
                -
              </button>
              <div className="cart-count">{product.quantity}</div>
              <button
                className="cart-counter-btn"
                onClick={() =>
                  incrementCount(
                    product.cartId,
                    product.productId,
                    product.quantity
                  )
                }
              >
                +
              </button>
            </div>
            <div className="cart-prices">
              <div className="cart-amount">${product.price}</div>
              <button
                className="cart-remove"
                onClick={() => handleDelete(product.id)}
              >
                Remove
              </button>
            </div>
          </div>
        );
      });
    } else {
      mappedCart = <h1>There's nothing here...</h1>;
    }
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

        <button className='checkout-button'
         onClick={() => handleCheckOut(userId)}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;

// //<div class=”Header”>
//  <h3 class=”Heading”>Shopping Cart</h3>
//  <h5 class=”Action”>Remove all</h5>
//  </div>
