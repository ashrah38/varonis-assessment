import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "../shared/Select";
import Button from "@mui/material/Button";

const Home = () => {
  const navigate = useNavigate();

  // tracks the chosen category by the user
  const [selectedChoice, setSelectedChoice] = useState("");
  // this array only contains one option right now, but if we have multiple objects to track
  // just add them to this array and the Select component will take care of the rest.
  const options = [{ id: 1, name: "CPUs" }];
  // event handler once the view button is clicked - navigates user to the chosen inventory page
  const onViewHandler = () => {
    const url = `/${selectedChoice}`;
    navigate(url);
  };

  return (
    <div className="display-container">
      <div className="choose-type">
        <p>View Inventory For: </p>
        <Select options={options} selectedChoice={selectedChoice} setSelectedChoice={setSelectedChoice} />
        <Button variant="contained" size="small" onClick={onViewHandler}>
          View
        </Button>
      </div>
    </div>
  );
};

export default Home;
