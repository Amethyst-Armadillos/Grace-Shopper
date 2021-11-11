import React, { useState } from "react";
import AllProducts from "./components/AllProducts";

import Navbar from "./components/Navbar";
import Routes from "./Routes";

const App = () => {
  return (
    <div>
      <Navbar />\
      <div className='app'>
        <Routes />
      </div>
    </div>
  );
};

export default App;
