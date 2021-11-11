import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {connect, useSelector} from 'react-redux'
import Cart from "./Cart"

// const cartFromLocalStorage = JSON.parse(LocalStorage.getItem('cart') // [])

export const AllProducts = (props) => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);



  useEffect(() => {
    axios.get(`/api/products`).then((response) => {
      setData(response.data);
    });
  }, [cart]);
console.log(data, 'hajdasdashdas')
  const userId = useSelector(state => state.auth.id);

  const handleCart = function(id){
  console.log(id)

  console.log(userId)
  if(userId){
  axios.put(`/api/products/${[id, userId]}`)
  }else{

      axios.get(`/api/products/${id}`).then((response) => {
       cart.push(response.data)
        localStorage.setItem(`cart`, JSON.stringify(cart) )
      });
    }

  }


  const mappedProducts = data.map((product) => {
    return (
      <div key={product.id}>
        <p>Name: {product.name}</p>
        <p>Price: {product.price}</p>
        <p>Stock: {product.stock}</p>
        <Link to={`/products/${product.id}`}>
          <button>View Product</button>
        </Link>
        <button id="addCart" type="button" onClick={() => handleCart(product.id)}>Add to Cart</button>
      </div>
    );
  });

  return <div>{mappedProducts}</div>;
};



export default AllProducts;
