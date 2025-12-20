const express = require("express");
const adminMiddleware = require("../middleware/isAdmin.js");

const adminRouter = express.Router();
const { getAllUsers } = require("../controllers/userController");

const {
  createAnalysis,
  updateAnalysis,
  deleteAnalysis,
} = require("../controllers/analysisController");
const {
  createSkinAnalysisRecord,
  updateSkinAnalysisRecord,
  deleteSkinAnalysisRecord,
} = require("../controllers/skinAnalysisRecordController");
const {
  createTreatment,
  updateTreatment,
  deleteTreatment,
} = require("../controllers/treatmentController");
const {
  createSkin,
  updateSkin,
  deleteSkin,
} = require("../controllers/skinController");

adminRouter.post("/analysis", adminMiddleware, createAnalysis);
adminRouter.put("/analysis/:id", adminMiddleware, updateAnalysis);
adminRouter.delete("/analysis/:id", adminMiddleware, deleteAnalysis);

adminRouter.post("/record", adminMiddleware, createSkinAnalysisRecord);
adminRouter.put("/record/:id", adminMiddleware, updateSkinAnalysisRecord);
adminRouter.delete("/record/:id", adminMiddleware, deleteSkinAnalysisRecord);

adminRouter.post("/treatment", adminMiddleware, createTreatment);
adminRouter.put("/treatment/:id", adminMiddleware, updateTreatment);
adminRouter.delete("/treatment/:id", adminMiddleware, deleteTreatment);

adminRouter.post("/skin", adminMiddleware, createSkin);
adminRouter.put("/skin/:id", adminMiddleware, updateSkin);
adminRouter.delete("/skin/:id", adminMiddleware, deleteSkin);

adminRouter.get("/users", adminMiddleware, getAllUsers);

module.exports = adminRouter;
