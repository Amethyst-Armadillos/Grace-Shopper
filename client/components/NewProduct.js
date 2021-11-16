import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const NewProduct = (props) => {
  const hasAccess = useSelector((state) => {
    return state.auth.securityLevel === "admin";
  });
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1585157603209-378be66bede1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=912&q=80",
  });

  useEffect(() => {
    console.log("useEffect");
    console.log(product);
  });

  const bmit = (data) => {
    data.preventDefault();
    axios.post(`/api/products/new`, product).then((res) => {
      props.history.push("/products");
    });
  };
  let { name, price, stock, imageUrl } = product;
  return (
    <div>
      {hasAccess ? (
        <div>
          <h1>Add Product</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={(e) => {
                  setProduct({ ...product, name: e.target.value });
                }}
                value={name}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="decimal"
                name="price"
                className="form-control"
                onChange={(e) => {
                  setProduct({ ...product, price: e.target.value });
                }}
                value={price}
              />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                className="form-control"
                onChange={(e) => {
                  setProduct({ ...product, stock: e.target.value });
                }}
                value={stock}
              />
            </div>
            <label>ImageUrl</label>
            <input
              type="text"
              name="imageUrl"
              className="form-control"
              onChange={(e) => {
                setProduct({ ...product, imageUrl: e.target.value });
              }}
              value={imageUrl}
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <h1>No access</h1>
      )}
    </div>
  );
};
