import axios from "axios";
import { use } from "chai";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Cart = () => {
  const [cart, setCart] = useState([]);

  //the below checks to see if a user is logged in.  If so, it returns their user-specific cart. Otherwise, it returns the cart currently assigned to "guest".

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId && userId !== "undefined") {
      axios.get(`/api/cart/${userId}`).then((response) => {
        setCart(response.data);
      });
    } else {
      let items = localStorage.getItem("guest");
      if (items) {
        let cartArr = JSON.parse(items);
        let guestCart = cartArr.filter((product) => {
          return product.fullFilled !== true;
        });

        setCart(guestCart);
      }
    }
  }, []);

  const handleDelete = (cartId, id) => {
    if (userId) {
      axios.delete(`/api/cart/${cartId}/${id}`);
    }

    let guestCart = JSON.parse(localStorage.getItem("guest"));
    if (guestCart) {
      let guestCardEdit = cart.filter((product) => product.productId != id);
      setCart(guestCardEdit);
      localStorage.setItem("guest", JSON.stringify(guestCardEdit));
    }
  };

  const decrementCount = function (cartId, productId, quantity) {
    let newQuantity = (quantity -= 1);

    let cartItems = [];

    if (cartId) {
      axios.put(`/api/cart/${cartId}/${productId}`, {
        quantity: newQuantity,
        cart: cart,
      });

      axios.get(`/api/cart/${userId}`).then((response) => {
        setCart(response.data);
      });
    } else {
      cartItems = JSON.parse(localStorage.getItem("guest"));

      for (let x = 0; x < cart.length; x++) {
        if (cartItems[x].productId === productId) {
          if (cartItems[x].quantity > 1) {
            cartItems[x].quantity -= 1;
          }
        }
      }
      localStorage.setItem("guest", JSON.stringify(cartItems));
      setCart(cartItems);
    }
  };

  const incrementCount = async function (cartId, productId, quantity) {
    let newQuantity = (quantity += 1);
    // let inCart = cart;
    // console.log(inCart)
    let inCartItems = cart;
    let cartItems = [];
    if (cartId) {
      axios.put(`/api/cart/${cartId}/${productId}`, {
        quantity: newQuantity,
        cart: cart,
      });
      for (let x = 0; x < inCartItems.length; x++) {
        if (inCartItems[x].productId === productId) {
          inCartItems[x].quantity += 1;
        }
      }
      await axios.get(`/api/cart/${userId}`).then((response) => {
        response.data.sort();
        setCart(response.data);
      });
    } else {
      cartItems = JSON.parse(localStorage.getItem("guest"));

      for (let x = 0; x < cartItems.length; x++) {
        if (cartItems[x].productId === productId) {
          cartItems[x].quantity += 1;
        }
      }
      localStorage.setItem("guest", JSON.stringify(cartItems));
      setCart(cartItems);
    }
  };

  const handleCheckOut = (id) => {
    if (id) {
      axios.put(`/api/cart/${id}`).then((response) => {
        setCart(response.data);
      });
    }
    let cartData = JSON.parse(localStorage.getItem("guest"));

    cartData = cartData.map((product) => {
      return {
        cartId: product.CartId,
        createdAt: product.createdAt,
        fullFilled: true,
        id: product.id,
        imageUrl: product.imageUrl,
        name: product.name,
        price: product.price,
        productId: product.productId,
        quantity: product.quantity,
        updatedAt: product.updatedAt,
      };
    });

    cartData = cartData.filter((product) => {
      return product.fullFilled != true;
    });
    localStorage.setItem("guest", JSON.stringify(cartData));

    setCart(cartData);
  };

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
                onClick={() => handleDelete(product.cartId, product.productId)}
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

        <button
          className="checkout-button"
          onClick={() => handleCheckOut(userId)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
