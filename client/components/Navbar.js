import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { useSelector } from "react-redux";

const Navbar = ({ handleClick, isLoggedIn, securityLevel }) => (


  <nav className='nav-bar'>
    {isLoggedIn ? (
      <div className='nav-bar'>
        {/* The navbar will show these links after you log in */}
        <img src='/flowerlogo.png' className='navlogo' />
        <Link to='/home'>Home</Link>
        <Link to='/products'>Products</Link>
        <Link to='/cart'>Cart</Link>
        <a href='#' onClick={handleClick}>
          Logout
        </a>
        {securityLevel === "admin" && <Link to='/userinfo'>UserInfo</Link>}
      </div>
    ) : (
      <div className='nav-bar'>
        {/* The navbar will show these links before you log in */}
        <img src='./flowerlogo.png' className='navlogo' />
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Sign Up</Link>
        <Link to='/products'>Products</Link>
        <Link to='/cart'>Cart</Link>
      </div>
    )}
  </nav>
);

const guestCheck = JSON.parse(localStorage.getItem('guest'))
console.log(guestCheck)
if(!guestCheck){
const guestId = []
  localStorage.setItem('guest', JSON.stringify(guestId))
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
