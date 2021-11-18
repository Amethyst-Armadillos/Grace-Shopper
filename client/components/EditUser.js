import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export const EditUser = (props) => {
  const hasAccess = useSelector((state) => {
    if (
      state.auth.securityLevel === "admin" ||
      state.auth.id === props.match.params.id
    ) {
      return true;
    } else {
      return false;
    }
  });

  const isAdmin = useSelector((state) => {
    if (state.auth.securityLevel === "admin") {
      return true;
    } else {
      return false;
    }
  });

  const [user, setUser] = useState({});
  const tokenFromLocalStorage = window.localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`/api/users/${props.match.params.id}`, {
        headers: { authorization: tokenFromLocalStorage },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {hasAccess ? (
        <div>
          <h1>Edit User</h1>
          <form>
            <label>
              Username:
              <input
                type='text'
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </label>
            <label>
              Password:
              <input
                type='text'
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </label>
            {isAdmin && (
              <label>
                Security Level:
                <input
                  type='text'
                  value={user.securityLevel}
                  onChange={(e) =>
                    setUser({ ...user, securityLevel: e.target.value })
                  }
                />
              </label>
            )}
            <button
              onClick={() => {
                axios
                  .put(`/api/users/edit/${user.id}`, {
                    headers: { authorization: tokenFromLocalStorage, user },
                  })

                  .then((res) => {
                    props.history.push("/users");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <h2>No access</h2>
      )}
    </div>
  );
};
