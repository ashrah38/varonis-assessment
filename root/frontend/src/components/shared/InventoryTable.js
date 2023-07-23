import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const port = process.env.REACT_APP_BE_PORT;
const InventoryTable = ({ tableHeaders, tableData, setTableData, setChosenItem }) => {
  const navigate = useNavigate();

  const onCreateHandler = () => {
    const url = `create`;
    navigate(url);
  };

  const onDetailsHandler = (cpu) => {
    const url = `${cpu.id}`;
    navigate(url);
  };

  const onEditHandler = (cpu) => {
    setChosenItem(cpu);
    const url = `edit/${cpu.id}`;
    navigate(url);
  };

  const onDeleteHandler = async (cpu) => {
    try {
      const response = await axios.delete(`http://localhost:${[port]}/api/cpus/${cpu.id}`);
      console.log(response.data);
      toast.success("Entry deleted successfully.", {
        autoClose: 900,
        hideProgressBar: true,
        progress: 0,
        theme: "colored",
      });
      // remove the deleted object from the state variable cpuData
      const indexToRemove = tableData.findIndex((obj) => obj.id === cpu.id);
      setTableData([...tableData.slice(0, indexToRemove), ...tableData.slice(indexToRemove + 1)]);
    } catch (error) {
      toast.error(error.message, {
        autoClose: 900,
        hideProgressBar: true,
        progress: 0,
        theme: "colored",
      });
    }
  };

  return (
    <div className="inventory-table">
      <ToastContainer className="toaster-container" autoClose={2000} hideProgressBar theme="colored" />
      <div className="create-new-button">
        <Button variant="contained" size="small" onClick={onCreateHandler}>
          Create New
        </Button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <td key={header.id}>{header.name}</td>
            ))}
            <td>Options</td>
          </tr>
        </thead>
        <tbody>
          {tableData.map((cpu) => (
            <tr key={cpu.id}>
              <td>{cpu.manufacturer}</td>
              <td>{cpu.make}</td>
              <td>{cpu.coreCount}</td>
              <td>{cpu.clockSpeed}</td>
              <td>{cpu.price}</td>
              <td>
                <div className="row-btn-container">
                  <Button variant="contained" size="small" onClick={() => onDetailsHandler(cpu)}>
                    Details
                  </Button>
                  <Button variant="contained" size="small" color="secondary" onClick={() => onEditHandler(cpu)}>
                    Edit
                  </Button>
                  <Button variant="contained" size="small" color="error" onClick={() => onDeleteHandler(cpu)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
