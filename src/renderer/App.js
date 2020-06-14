import React, { createContext } from "react";

import Footer from "common/Footer";
import Header from "common/Header";
import Dashboard from "common/Dashboard";

import "./App.scss";



const App = () => {
  return (
    <div className="App">
      <Dashboard />
      <Footer />
    </div>
  );
};

export default App;
