import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const port = process.env.REACT_APP_BE_PORT;

const CPUDetails = () => {
  const { id } = useParams();
  const [cpuData, setCpuData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:${port}/api/cpus/${id}`);
        const data = response.data;
        setCpuData(data);
      } catch (error) {
        // axios automatically throws an error for any status code apart from 200
        toast.error(error.message, {
          autoClose: 900,
          hideProgressBar: true,
          progress: 0,
          theme: "colored",
        });
      }
    };
    fetchData();
  }, [id]);

  const onClickBackToInventory = () => {
    const url = `/cpus`;
    navigate(url);
  };

  return (
    <div>
      <ToastContainer className="toaster-container" autoClose={2000} hideProgressBar theme="colored" />
      <ul className="item-details">
        {Object.entries(cpuData).map(([key, value]) => (
          <li key={key}>
            <strong>{key}: </strong>
            {value}
          </li>
        ))}
      </ul>
      <div className="details-btn"></div>
      <Button variant="contained" color="secondary" size="small" onClick={onClickBackToInventory}>
        Back to Inventory
      </Button>
    </div>
  );
};

export default CPUDetails;
