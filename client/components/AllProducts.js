import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { motion } from "framer-motion";

const tokenFromLocalStorage = window.localStorage.getItem("token");


export const AllProducts = (props) => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("guest")));
  useEffect(() => {
    axios.get(`/api/products`, { headers: {authorization: tokenFromLocalStorage } }).then((response) => {
      setData(response.data);
    });
  }, []);

  const userId = useSelector((state) => state.auth.id);
  const isAdmin = useSelector((state) => {
    return state.auth.securityLevel === "admin";
  });

  const handleCart = async function (id) {
    if (userId) {
      await axios.put(`/api/cart/addproduct`, {
        productId: id,
        userId,
        quantity: 1,
      });
    } else {
      let product = await axios.get(`/api/products/${id}`);
      let response = product;

      let cartItem = {
        quantity: 1,
        productId: response.data.id,
        name: response.data.name,
        price: response.data.price,
        imageUrl: response.data.imageUrl,
        fullFilled: false,
      };

      if (cart.length >= 1) {
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].productId === id && cart[i].fullFilled === false) {
            cart[i].quantity += 1;
          }
        }

        let found = cart.filter((product) => {
          return product.productId === id && product.fullFilled === false;
        });

        if (found.length < 1) {
          cart.push(cartItem);
        }
      } else {
        cart.push(cartItem);
      }

      setCart(cart);

      window.localStorage.setItem("guest", JSON.stringify(cart));
    }
  };

  const mappedProducts = data.map((product) => {
    return (
      <motion.div
        initial={{ opacity: 0.01 }}
        animate={{ opacity: 1 }}
        className='product-preview'
        key={product.id}
      >
        <Link to={`/products/${product.id}`}>
          <img
            className='preview-image'
            src={product.imageUrl}
            alt={product.name}
          />
        </Link>
        <button
          id='addCart'
          type='button'
          className='btn'
          onClick={() => handleCart(product.id)}
        >
          Add to Cart
        </button>
        {isAdmin && (
          <Link to={`/products/${product.id}/edit`}>
            <button type='button'>Edit Product</button>
          </Link>
        )}
      </motion.div>
    );
  });

  return (
    <div className='all-products-container'>
      {mappedProducts}
      {isAdmin && (
        <Link to='/create/products'>
          <button>Add New Product</button>
        </Link>
      )}
    </div>
  );
};

export default AllProducts;
