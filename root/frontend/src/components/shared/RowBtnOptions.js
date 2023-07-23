import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const RowBtnOptions = ({ item, setChosenItem }) => {
  const navigate = useNavigate();

  const onClickDetails = (item) => {
    const url = `${item.id}`;
    navigate(url);
  };

  const onClickEdit = (item) => {
    setChosenItem(item);
    const url = `edit/${item.id}`;
    navigate(url);
  };

  const onClickDelete = async (item) => {
    try {
      console.log(item);
      const response = await axios.delete(`http://localhost:8080/api/cpus/${item.id}`);
      console.log("Form data submitted successfully:", response.data);
      alert("Entry deleted successfully.");
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert(`Error submitting: ${error.message}`);
    }
  };

  return (
    <div className="row-btn-container">
      <Button variant="contained" size="small" onClick={() => onClickDetails(item)}>
        Details
      </Button>
      <Button variant="contained" size="small" color="secondary" onClick={() => onClickEdit(item)}>
        Edit
      </Button>
      <Button variant="contained" size="small" color="error" onClick={() => onClickDelete(item)}>
        Delete
      </Button>
    </div>
  );
};

export default RowBtnOptions;
