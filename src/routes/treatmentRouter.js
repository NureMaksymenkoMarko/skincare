const express = require("express");
const userRouter = express.Router();

const adminMiddleware = require("../middleware/isAdmin.js");
const authMiddleware = require("../middleware/auth.js");

const {
  getTreatmentById,
  getAllTreatments,
  getTreatmentsByUser,
} = require("../controllers/treatmentController");

userRouter.get("/treatment", adminMiddleware, getAllTreatments);
userRouter.get("/treatment/:id", authMiddleware, getTreatmentById);
userRouter.get("/users/:userId/treatments", authMiddleware, getTreatmentsByUser);

module.exports = userRouter;
