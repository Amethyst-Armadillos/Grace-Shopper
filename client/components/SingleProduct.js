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

  const handleDelete = (e) => {
    axios.delete(`/api/products/${securityLevel}/${props.match.params.id}`);
    window.open("/");
  };

  const handleEdits = (e) => {
    axios.put(`/api/products/${securityLevel}/${props.match.params.id}`);
  };

  const handleSubmit = (e) => {};

  return (
    <div>
      <div>{Product.name}</div>
      <div>${Product.price}</div>
      <div>Quantity Available: {Product.stock} bouquets</div>
      <div>
        <img src={Product.imageUrl} />
      </div>
      {isAdmin && (
        <button onClick={handleDelete} type="button">
          Remove from Site
        </button>
      )}

      {isAdmin && (
        <form>
          <label>Price:</label>

          <input
            value={"$" + Product.price}
            type="text"
            name="name"
            onChange={handleEdits}
          />

          <label>Quantity:</label>
          <input
            value={Product.stock}
            type="text"
            name="name"
            onChange={handleEdits}
          />

          <label>ImageUrl:</label>
          <input
            value={Product.imageUrl}
            type="text"
            name="name"
            onChange={handleEdits}
          />

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default SingleProduct;
