import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { motion } from "framer-motion";

export const AllProducts = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`/api/products`).then((response) => {
      setData(response.data);
    });
  }, []);

  const userId = useSelector((state) => state.auth.id);
  const isAdmin = useSelector((state) => {
    return state.auth.securityLevel === "admin";
  });

  const handleCart = async function (id) {
    if (userId) {
      axios.put(`/api/products/${[id, userId, 1]}`);
    } else {
      await axios.put(`/api/products/${[id, null, 1]}`).then((response) => {
        window.localStorage.setItem("cart", JSON.stringify(response.data));
      });
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
