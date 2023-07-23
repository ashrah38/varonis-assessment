const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");

const cpu = sequelize.define("cpu", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  manufacturer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  make: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  coreCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  clockSpeed: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

// usually, we export all models to a single file, and then run sequelize.sync in that file
// as I currently only have one relation, we will be syncing it here.
sequelize
  .sync()
  .then(() => console.log("Database connected and synced."))
  .catch((err) => console.error("Problem occurred when syncing database:", err));

module.exports = cpu;
