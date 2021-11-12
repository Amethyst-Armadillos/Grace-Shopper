import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const UserInfo = (props) => {
  const [users, setUser] = React.useState([]);

  const handleDelete = (id) => {
    axios.delete(`/api/users/${id}`).then((res) => {
      setUser(users.filter((user) => user.id !== id));
    });
  };

  useEffect(() => {
    axios.get("/api/users/").then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <div>
      <h1>User Info</h1>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <h3>{user.username}</h3>
              <p>{user.email}</p>
              <p>{user.securityLevel}</p>
              <button
                onClick={() =>
                  axios.delete(`/api/users/${user.id}`).then((res) => {
                    setUser(users.filter((newuser) => newuser.id !== user.id));
                  })
                }
                type='button'
              >
                Delete User
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
