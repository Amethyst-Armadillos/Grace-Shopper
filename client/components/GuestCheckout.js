import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

import axios from "axios";

/**
 * COMPONENT
 */
const GuestCheckout = (props) => {
  const [Cart, setCart] = useState([]);

  const userId = useSelector((state) => state.auth.id);
  localStorage.setItem("userId", JSON.stringify(userId));

  useEffect(() => {
    async function fetchData() {
      let guestCart = await axios.get("/api/cart/guestCheckout");

      window.localStorage.setItem(
        "guestCartId",
        JSON.stringify(guestCart.data)
      );

      setCart(guestCart);
    }
    fetchData();
    //  let guestCart = JSON.parse(localStorage.getItem('guestCartId'))
  }, []);

  // let guestCartId = Cart.data.id
  if (!Cart) {
    let guestCartId = JSON.parse(localStorage.getItem("guestCartId"));

    return (
      <div className="home">
        <div className="content">
          <h3>fresh flowers</h3>
          <span> Thank you for shopping with us! </span>
          <p>Your order number is {guestCartId}</p>
          <a href="/products" className="btn">
            shop now
          </a>
        </div>
      </div>
    );
  } else {
    let guestCartId = JSON.parse(localStorage.getItem("guestCartId"));

    return (
      <div className="home">
        <div className="content">
          <h3>fresh flowers</h3>
          <span> Thank you for shopping with us! </span>
          <p>Your order number is 1</p>
          <a href="/products" className="btn">
            shop now
          </a>
        </div>
      </div>
    );
  }
};

/**
 * CONTAINER
 */

export default GuestCheckout;
