import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

export const SingleProduct = (props) => {
  const [Product, setData] = useState("");
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("guest")));

  const securityLevel = useSelector((state) =>
    state.auth ? state.auth.securityLevel : "customer"
  );

  const isAdmin = securityLevel === "admin";

  const tokenFromLocalStorage = window.localStorage.getItem("token");

  useEffect(() => {
    axios.get(`/api/products/${props.match.params.id}`).then((response) => {
      setData(response.data);
    });
  }, []);

  const userId = useSelector((state) => state.auth.id);

  const handleCart = async function (id) {
    if (userId) {
      await axios.put(`/api/cart/addproduct/`, {
        productId: id,
        userId: userId,
        quantity: 1,
      });
    } else {
      await axios.get(`/api/products/${id}`).then((response) => {
        let cartItem = {
          quantity: 1,
          productId: response.data.id,
          name: response.data.name,
          price: response.data.price,
          imageUrl: response.data.imageUrl,
          fullFilled: false,
        };

        if (cart.length >= 1) {
          for (let i = 0; i < cart.length; i++) {
            if (cart[i].productId === id && cart[i].fullFilled === false) {
              cart[i].quantity += 1;
            }
          }

          let found = cart.filter((product) => {
            return product.productId === id && product.fullFilled === false;
          });

          if (found.length < 1) {
            cart.push(cartItem);
          }
        } else {
          cart.push(cartItem);
        }

        setCart(cart);

        window.localStorage.setItem("guest", JSON.stringify(cart));
      });
    }
  };

  const handleDelete = (e) => {
    axios.delete(`/api/products/${props.match.params.id}`, { headers: {authorization: tokenFromLocalStorage } } );
    window.open("/");
  };

  return (
    <div className='container'>
      <div className='single-product-container'>
        <div>{Product.name}</div>
        <div>{Product.price}</div>
        <img className='single-image' src={Product.imageUrl} />
        <button onClick={() => handleCart(Product.id)}>Add to cart</button>
        {isAdmin && (
          <div>
            <Link to={`/products/${Product.id}/edit`}>
              <button>Edit Product</button>
            </Link>
            <button type='button' onClick={handleDelete}>
              Delete Object
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
