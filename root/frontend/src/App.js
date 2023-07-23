import React from "react";
import { Route, Routes } from "react-router-dom";
import Toolbar from "./components/shared/Toolbar";
import Home from "./components/home/Home";
import CPUInventory from "./components/cpu-inventory/CPUInventory";
import Footer from "./components/shared/Footer";
const App = () => {
  return (
    <div className="App">
      <Toolbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cpus/*" element={<CPUInventory />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
