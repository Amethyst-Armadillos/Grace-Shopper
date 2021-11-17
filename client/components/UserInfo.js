import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const UserInfo = (props) => {
  const [users, setUser] = React.useState([]);

  const securityLevel = useSelector((state) =>
    state.auth ? state.auth.securityLevel : "customer"
  );

  //I'm trying to figure out how to add the user as part of the request body so that the middleware can access it.
  useEffect(() => {

    axios
      .get("/api/users/", { headers: {authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjM3MTE5NDUyfQ.v2Y1ucFudr44zJhKjuqiCJhTnywb91eexUhgCcq41M0" } })
      .then((res) => {
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
                    axios.delete(`/api/users/${user.id}`, { headers: {authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjM3MTE5NDUyfQ.v2Y1ucFudr44zJhKjuqiCJhTnywb91eexUhgCcq41M0" } }).then((res) => {
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
