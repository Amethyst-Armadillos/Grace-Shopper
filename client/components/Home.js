import React from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;
  const userId = useSelector((state) => state.auth.id);
  localStorage.setItem("userId", JSON.stringify(userId));

  return (
    <div className="home">
      <div className="content">
        <h3>Wonderful Flowers</h3>
        <span> natural & beautiful flowers </span>
        <p>They're just full of wonder!</p>
        <a href="/products" className="btn">
          Shop Now
        </a>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
