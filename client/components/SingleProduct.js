import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import axios from "axios";

export const SingleProduct = (props) => {
  const [Product, setData] = useState("");

  useEffect(() => {
    axios.get(`/api/products/${props.match.params.id}`).then((response) => {
      setData(response.data);
    });
  }, []);


  return (
    <div>
      <div>Product name: {Product.name}</div>
      <div>Product price: {Product.price}</div>
      <div>Product stock: {Product.stock}</div>
      <div>Product imageUrl: {Product.imageUrl}</div>
      hello
    </div>
  );
};


export default connect()(SingleProduct);
