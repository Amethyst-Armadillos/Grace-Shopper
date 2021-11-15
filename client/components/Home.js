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
    <div className='home'>
      <div className='content'>
        <h3>fresh flowers</h3>
        <span> natural & beautiful flowers </span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
          laborum ut minus corrupti dolorum dolore assumenda iste voluptate
          dolorem pariatur. Please work
        </p>
        <a href='/products' className='btn'>
          shop now
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
