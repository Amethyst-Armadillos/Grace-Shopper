import React, { useState } from "react";
import AllProducts from "./components/AllProducts";

import Navbar from "./components/Navbar";
import Routes from "./Routes";

const App = () => {
  const [secLevel, setSecLevel] = useState("customer");

  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
