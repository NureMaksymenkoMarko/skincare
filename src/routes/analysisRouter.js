const express = require("express");
const adminMiddleware = require("../middleware/isAdmin.js");
const authMiddleware = require("../middleware/auth.js");

const userRouter = express.Router();

const {
  getAnalysisById,
  getAllAnalyses,
  getAnalysesBySkin,
  getAnalysesByUserId,
} = require("../controllers/analysisController");

userRouter.get("/analysis", adminMiddleware, getAllAnalyses);
userRouter.get("/analysis/:id", authMiddleware, getAnalysisById);
userRouter.get("/skin/:skinId/analyses", authMiddleware, getAnalysesBySkin);
userRouter.get("/users/:userId/analysis", authMiddleware, getAnalysesByUserId);

module.exports = userRouter;