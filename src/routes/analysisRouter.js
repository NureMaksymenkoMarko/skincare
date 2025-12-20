const express = require("express");

const adminMiddleware = require("../middleware/isAdmin.js");
const authMiddleware = require("../middleware/auth.js");

const userRouter = express.Router();

const {
  getAnalysisById,
  getAllAnalyses,
} = require("../controllers/analysisController");

userRouter.get("/analysis", adminMiddleware, getAllAnalyses);
userRouter.get("/analysis/:id", authMiddleware, getAnalysisById);

module.exports = userRouter;
