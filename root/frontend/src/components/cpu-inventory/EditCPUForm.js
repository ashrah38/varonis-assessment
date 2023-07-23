import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const port = process.env.REACT_APP_BE_PORT;

const EditCPUForm = ({ item, cpuData, setCpuData }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    manufacturer: item.manufacturer,
    make: item.make,
    coreCount: item.coreCount,
    clockSpeed: item.clockSpeed,
    price: item.price,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:${port}/api/cpus/${item.id}`, formData);
      toast.success("Form submitted successfully.", {
        autoClose: 900,
        hideProgressBar: true,
        progress: 0,
        theme: "colored",
      });
      // successful edit made - update the cpuData state variable so we don't have
      // to make a GET request for new updates everytime.
      setCpuData(cpuData.map((obj) => (obj.id === response.data.id ? response.data : obj)));
    } catch (error) {
      toast.error(error.message, {
        autoClose: 900,
        hideProgressBar: true,
        progress: 0,
        theme: "colored",
      });
    }
  };

  const onClickBackToInventory = () => {
    const url = `/cpus`;
    navigate(url);
  };

  return (
    <form onSubmit={handleSubmit} className="create-form">
      <ToastContainer className="toaster-container" autoClose={2000} hideProgressBar theme="colored" />
      <div className="create-form-input">
        <label htmlFor="manufacturer">Manufacturer:</label>
        <input type="text" id="manufacturer" name="manufacturer" value={formData.manufacturer} onChange={handleChange} required />
      </div>
      <div className="create-form-input">
        <label htmlFor="make">Make:</label>
        <input type="text" id="make" name="make" value={formData.make} onChange={handleChange} required />
      </div>
      <div className="create-form-input">
        <label htmlFor="coreCount">Core Count:</label>
        <input type="number" id="coreCount" name="coreCount" value={formData.coreCount} onChange={handleChange} required />
      </div>
      <div className="create-form-input">
        <label htmlFor="clockSpeed">Clock Speed:</label>
        <input type="number" id="clockSpeed" name="clockSpeed" value={formData.clockSpeed} onChange={handleChange} required />
      </div>
      <div className="create-form-input">
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
      </div>
      <div className="create-form-btn-container">
        <Button variant="contained" color="primary" type="submit" size="small">
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={onClickBackToInventory}>
          Back to Inventory
        </Button>
      </div>
    </form>
  );
};

export default EditCPUForm;
