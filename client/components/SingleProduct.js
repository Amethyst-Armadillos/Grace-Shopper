import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

export const SingleProduct = (props) => {
  const [Product, setData] = useState("");
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("guest")));
  const [quantity, setQuantity] = useState(1);

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

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleCart = async function (id) {
    if (userId) {
      axios.put(`/api/products/${[id, userId, quantity]}`);
    } else {
      await axios.get(`/api/products/${id}`).then((response) => {
        let cartItem = {
          quantity: quantity,
          productId: response.data.id,
          name: response.data.name,
          price: response.data.price,
          imageUrl: response.data.imageUrl,
          fullFilled: false,
        };

        if (cart.length >= 1) {
          for (let i = 0; i < cart.length; i++) {
            if (cart[i].productId === id && cart[i].fullFilled === false) {
              cart[i].quantity += quantity;
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
    axios.get(`/api/products/${props.match.params.id}`).then((response) => {
      setData(response.data);
    });
  };

  const handleDelete = (e) => {
    axios.delete(`/api/products/${props.match.params.id}`);
    window.open("/");
  };

  return (
    <div className='container'>
      <div className='single-product-container'>
        <div>{Product.name}</div>
        <div>{Product.price}</div>
        <img className='single-image' src={Product.imageUrl} />
        {Product.stock > 0 ? (
          <div>
            <select value={quantity} onChange={handleQuantity} name='quantity'>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
            <button onClick={() => handleCart(Product.id)}>Add to cart</button>
          </div>
        ) : (
          <button disabled>Out of stock</button>
        )}
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
