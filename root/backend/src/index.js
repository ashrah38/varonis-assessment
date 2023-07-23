const express = require("express");
const cors = require("cors");
const cpuRoutes = require("./api/routes/cpuRoutes");
require("dotenv").config();
const app = express();

// initializing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// initialize the server at the specified port.
try {
  app.listen(process.env.PORT || 3005, () => {
    console.log(`Server is running.`);
  });
} catch (error) {
  console.log("Error starting the server", error.message);
}

// routes
app.use("/api/cpus", cpuRoutes);
