import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [history, setHistory] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      async function fetchData() {
        const response = await axios.get(`/api/cart/history/${userId}`);
        setHistory(response.data);
      }
      fetchData();
    }
  }, []);

  let subtotal = 0;
  let mappedHistory;

  if (history.length == 0) {
    mappedHistory = (
      <tr className="nothing">
        <td colSpan="5">There is nothing here...</td>
      </tr>
    );
  } else {
    mappedHistory = history.map((order) => {
      subtotal += order.price * order.quantity;
      return (
        <tr key={order.id}>
          <td>
            <img src={order.imageUrl} />
          </td>
          <td>#{order.cartId}</td>
          <td>{order.name}</td>
          <td>$ {order.price}</td>
          <td>{order.quantity}</td>
        </tr>
      );
    });
  }

  return (
    <div>
      <h2 className="history">Order History</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Order ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{mappedHistory}</tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total</td>
            <td colSpan="2">$ {subtotal.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderHistory;
