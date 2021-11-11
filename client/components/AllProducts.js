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

  const handleCart = function (id) {
    //console.log(id);

    //console.log(userId);
    axios.put(`/api/products/${[id, userId, 1]}`);
  };

  const mappedProducts = data.map((product) => {
    return (
      <motion.div className='product-preview' key={product.id}>
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
      </motion.div>
    );
  });

  return <div className='all-products-container'>{mappedProducts}</div>;
};

const mapState = (state) => {
  return {
    userId: state.auth.id,
  };
};

export default AllProducts;
