import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {connect, useSelector} from 'react-redux'


export const AllProducts = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`/api/products`).then((response) => {
      setData(response.data);
    });
  }, []);

  const userId = useSelector(state => state.auth.id);

  const handleCart = function(id){
  console.log(id)

  console.log(userId)
  axios.put(`/api/products/${[id, userId]}`)
  }

  const mappedProducts = data.map((product) => {
    return (
      <div key={product.id}>
        <Link to={`/products/${product.id}`}>
          <p>{product.name}</p>
          <div>
        <img src={product.imageUrl} />
      </div>
        </Link>
        <button id="addCart" type="button" onClick={() => handleCart(product.id)}>Add to Cart</button>
      </div>
    );
  });

  return <div>{mappedProducts}</div>;
};

const mapState = state => {
  return {
    userId: state.auth.id
  }
}

export default AllProducts;
