import React from "react";

const products = [
  { id: 1, name: "dog", price: 25, stock: 10 },
  { id: 2, name: "cat", price: 5, stock: 15 },
  { id: 3, name: "armadillos", price: 2, stock: 10 },
];

export class AllProducts extends React.Component {
  render() {
    const mappedProducts = products.map((product) => {
      return (
        <div key={product.id}>
          <p>Name: {product.name}</p>
          <p>Price: {product.price}</p>
          <p>Stock: {product.stock}</p>
          <button>Add to Cart</button>
        </div>
      );
    });

    return (
      <div>
        <div>{mappedProducts}</div>
      </div>
    );
  }
}

export default AllProducts;
