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

  return (
    <div>
      <div>Product name: {Product.name}</div>
      <div>Product price: {Product.price}</div>
      <div>Product stock: {Product.stock}</div>
      <div>
        Product imageUrl:
        <img src={Product.imageUrl} />
      </div>
      {isAdmin && <button type='button'>Delete Object</button>}
      hello
    </div>
  );
};

export default SingleProduct;
