import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import InventoryTable from "../shared/InventoryTable";
import CreateCPUForm from "./CreateCPUForm";
import CPUDetails from "./CPUDetails";
import EditCPUForm from "./EditCPUForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const port = process.env.REACT_APP_BE_PORT || 3005;
console.log(port);
const CPUInventory = () => {
  // contains the CPUs retrieved from the database.
  // upon create, edit, delete, update this object rather than making a new GET request.
  const [cpuData, setCpuData] = useState([]);
  const [chosenItem, setChosenItem] = useState();
  const tableHeaders = [
    { id: 1, name: "Manufacturer" },
    { id: 2, name: "Model" },
    { id: 3, name: "Core Count" },
    { id: 4, name: "Core Speed (GHz)" },
    { id: 5, name: "Price ($)" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:${port}/api/cpus`);
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
  }, []);

  return (
    <div className="display-container inventory-container">
      <ToastContainer className="toaster-container" autoClose={2000} hideProgressBar theme="colored" />
      <Routes>
        <Route
          index
          element={
            <InventoryTable
              tableHeaders={tableHeaders}
              tableData={cpuData}
              setChosenItem={setChosenItem}
              setTableData={setCpuData}
            />
          }
        />
        <Route path="/create" element={<CreateCPUForm cpuData={cpuData} setCpuData={setCpuData} />} />
        <Route path="/:id" element={<CPUDetails />} />
        <Route path="/edit/:id" element={<EditCPUForm item={chosenItem} cpuData={cpuData} setCpuData={setCpuData} />} />
      </Routes>
    </div>
  );
};

export default CPUInventory;
