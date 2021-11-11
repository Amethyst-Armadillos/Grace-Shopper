import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export const SingleProduct = (props) => {
  const [Product, setData] = useState("");

  const securityLevel = useSelector((state) =>
    state.auth ? state.auth.securityLevel : "customer"
  );

  const isAdmin = securityLevel === "admin";

  useEffect(() => {
    axios.get(`/api/products/${props.match.params.id}`).then((response) => {
      setData(response.data);
    });
  }, []);

  const userId = useSelector((state) => state.auth.id);

  const handleCart = function (id) {
    console.log(id);

    console.log(userId);
    axios.put(`/api/products/${[id, userId, 1]}`);
  };

  const handleDelete = (e) => {
    axios.delete(`/api/products/${props.match.params.id}`);
    window.open("/");
  };

  return (
    <div className='container'>
      <div className='single-product-container'>
        <div>Product name: {Product.name}</div>
        <div>Product price: {Product.price}</div>
        <div>Product stock: {Product.stock}</div>
        <div>
          <img className='single-image' src={Product.imageUrl} />
          <button onClick={() => handleCart(Product.id)}>Add to cart</button>
        </div>
        {isAdmin && (
          <button type='button' onClick={handleDelete}>
            Delete Object
          </button>
        )}
        hello
      </div>
    </div>
  );
};

export default SingleProduct;
