import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const UserInfo = (props) => {
  const [users, setUser] = React.useState([]);

  const securityLevel = useSelector((state) =>
    state.auth ? state.auth.securityLevel : "customer"
  );

  useEffect(() => {
    axios.get("/api/users/").then((res) => {
      setUser(res.data);
    });
  }, []);

  if (securityLevel === "admin") {
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
                      setUser(
                        users.filter((newuser) => newuser.id !== user.id)
                      );
                    })
                  }
                  type="button"
                >
                  Delete User
                </button>
                <Link to={`/users/${user.id}`}>
                  <button type="button">Edit User</button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Must be admin to have access</h1>
      </div>
    );
  }
};
