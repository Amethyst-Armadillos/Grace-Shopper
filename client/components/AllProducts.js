import axios from "axios";
import React, { useEffect, useState } from "react";

export const AllProducts = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`/api/products`).then((response) => {
      setData(response.data);
    });
  }, []);

  const mappedProducts = data.map((product) => {
    return (
      <div key={product.id}>
        <p>Name: {product.name}</p>
        <p>Price: {product.price}</p>
        <p>Stock: {product.stock}</p>
        <button>Add to Cart</button>
      </div>
    );
  });

  return <div>{mappedProducts}</div>;
};

export default AllProducts;
