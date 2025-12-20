const express = require("express");
const router = express.Router();

const {
  createEnvironmentData,
  getEnvironmentDataByUser,
} = require("../controllers/environmentDataController");

router.post("/iot/environment", createEnvironmentData);
router.get("/users/:userId/environment", getEnvironmentDataByUser);

module.exports = router;
