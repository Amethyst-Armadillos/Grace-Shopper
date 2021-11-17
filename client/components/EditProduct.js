import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const EditProduct = (props) => {
  const hasAccess = useSelector((state) => {
    return state.auth.securityLevel === "admin";
  });
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios.get(`/api/products/${props.match.params.id}`, { headers: {authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjM3MTE5NDUyfQ.v2Y1ucFudr44zJhKjuqiCJhTnywb91eexUhgCcq41M0" } }).then((res) => {
      setProduct(res.data);
    });
  }, []);

  const handleSubmit = (data) => {
    data.preventDefault();
    const id = props.match.params.id[0];
    axios.put(`/api/products/edit/${id}`, { headers: {authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjM3MTE5NDUyfQ.v2Y1ucFudr44zJhKjuqiCJhTnywb91eexUhgCcq41M0" } }, product).then((res) => {
      props.history.push("/");
    });
  };
  let { name, price, stock, imageUrl } = product;
  return (
    <div>
      {hasAccess ? (
        <div>
          <h1>Edit Product</h1>
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
