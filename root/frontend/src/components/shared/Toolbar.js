import React from "react";
import { Link } from "react-router-dom";
const Toolbar = () => {
  return (
    <div className="toolbar">
      <h1>Inventory Tracking System</h1>
      <Link to="/" className="toolbar-link">
        Home
      </Link>
    </div>
  );
};

export default Toolbar;
