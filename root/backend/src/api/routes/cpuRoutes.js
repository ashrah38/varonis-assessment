const express = require("express");
const router = express.Router();
const cpuController = require("../controllers/cpuController");
// get all cpus in the inventory
router.get("/", (req, res) => {
  cpuController.getAllCPUs(req, res);
});
// get details regarding a single cpu object
router.get("/:id", (req, res) => {
  cpuController.getCPUById(req, res);
});
// create a new cpu object and add it to the database
router.post("/", (req, res) => {
  cpuController.addNewCPU(req, res);
});

// edit and update a cpu object already present in the database
router.put("/:id", (req, res) => {
  cpuController.updateCPU(req, res);
});
// delete a cpu object from the database.
router.delete("/:id", (req, res) => {
  cpuController.deleteCPU(req, res);
});

module.exports = router;
