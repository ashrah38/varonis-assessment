const CPU = require("../../models/cpu");

// as the relation grows, we should implement pagination and filtering to avoid returning all
// entries at the same time.
const getAllCPUs = async (req, res) => {
  try {
    const cpus = await CPU.findAll();
    res.json(cpus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// usually, this endpoint would extract more details regarding the specific
// item being queried (information stored in other relations, etc)
// for now, I am just retrieving the object from the CPU relation
const getCPUById = async (req, res) => {
  try {
    const cpu = await CPU.findByPk(req.params.id);
    if (cpu) {
      res.json(cpu);
    } else {
      res.status(404).json({ message: "CPU not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addNewCPU = async (req, res) => {
  try {
    // ideally, we should validate the req.body object before passing it to sequelize.
    const cpu = await CPU.create(req.body);
    res.status(201).json(cpu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCPU = async (req, res) => {
  try {
    const cpu = await CPU.findByPk(req.params.id);
    if (cpu) {
      // ideally, we should validate the req.body object before passing it to sequelize.
      await cpu.update(req.body);
      res.json(cpu);
    } else {
      res.status(404).json({ message: "CPU not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCPU = async (req, res) => {
  try {
    const cpu = await CPU.findByPk(req.params.id);
    if (cpu) {
      await cpu.destroy();
      res.json({ message: "CPU deleted" });
    } else {
      res.status(404).json({ message: "CPU not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllCPUs,
  getCPUById,
  addNewCPU,
  updateCPU,
  deleteCPU,
};
