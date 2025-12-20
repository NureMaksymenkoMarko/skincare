const express = require("express");
const userRouter = express.Router();

const adminMiddleware = require("../middleware/isAdmin.js");
const authMiddleware = require("../middleware/auth.js");
const {
  getSkinAnalysisRecordById,
  getAllSkinAnalysisRecords,
} = require("../controllers/skinAnalysisRecordController");

userRouter.get("/record", adminMiddleware, getAllSkinAnalysisRecords);
userRouter.get("/record/:id", authMiddleware, getSkinAnalysisRecordById);

module.exports = userRouter;
