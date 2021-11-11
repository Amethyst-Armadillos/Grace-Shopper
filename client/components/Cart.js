import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Cart = () => {
  const [cart, setCart] = useState([]);
   const [cartData, setCartData] = useState([]);


  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    if(userId){
    axios.get(`/api/cart/${userId}`).then((response) => {
      setCart(response.data);
    });
  }else{
    let cartData = JSON.parse(localStorage.getItem('cart'))
    console.log("response data", cartData);
  setCartData(cartData)
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
  let mappedCartt;
console.log(cartData, 'adasada')
  if (cart.length > 1) {
    mappedCart = cart.map((product) => {
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
  }else if(cartData) {
    console.log(cartData,'thisisisis')
    mappedCartt = cartData.map((product) => {
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
      <div>{mappedCartt}</div>
      <button>
        <h3>Checkout</h3>
      </button>
    </div>
  );
};

export default Cart;
