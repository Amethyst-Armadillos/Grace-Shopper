import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import axios from "axios";
import { useSelector } from "react-redux";

const Navbar = ({ handleClick, isLoggedIn, securityLevel }) => {
  const userId = localStorage.getItem("userId");

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (userId && userId !== "undefined") {
        axios.get(`/api/cart/${userId}`).then((response) => {
          console.log(response.data.length);
          setQuantity(response.data.length);
        });
      } else {
        let items = localStorage.getItem("guest");
        if (items) {
          items = JSON.parse(items);
          setQuantity(items.length);
        }
      }
    }, 500);
  });

  return (
    <nav className='nav-bar'>
      <img src='/flowerlogo.png' className='navlogo' />
      <nav className='nav-links'>
        <Link to='/home'>Home</Link>
        <Link to='/about'>about</Link>
        <Link to='/products'>Products</Link>
        <Link to='/contact'>Contact</Link>
        {isLoggedIn ? (
          <a href='#' onClick={handleClick}>
            Logout
          </a>
        ) : (
          <a href='/login'>Login</a>
        )}
        {!isLoggedIn && <a href='/signup'>Sign Up</a>}
        {securityLevel === "admin" && <Link to='/userinfo'>UserInfo</Link>}
      </nav>
      <div className='icons'>
        <Link to='/cart'>
          <img className='shopping-cart' src='./images/cart.png' />
        </Link>
        <p>{quantity}</p>
      </div>
    </nav>
  );
};

const guestCheck = JSON.parse(localStorage.getItem("guest"));
console.log(guestCheck);
if (!guestCheck) {
  const guestId = [];
  localStorage.setItem("guest", JSON.stringify(guestId));
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    securityLevel: state.auth.securityLevel,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
