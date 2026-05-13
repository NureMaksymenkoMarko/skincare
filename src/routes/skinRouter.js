const express = require("express");
const userRouter = express.Router();

const adminMiddleware = require("../middleware/isAdmin.js");
const authMiddleware = require("../middleware/auth.js");

const {
  createSkin,
  getSkinById,
  getAllSkins,
  getSkinByUserId,
  updateSkin,
  deleteSkin,
} = require("../controllers/skinController");

userRouter.post("/admin/skin", adminMiddleware, createSkin);
userRouter.get("/skin", adminMiddleware, getAllSkins);
userRouter.get("/skin/:id", authMiddleware, getSkinById);
userRouter.get("/users/:userId/skin", authMiddleware, getSkinByUserId);
userRouter.put("/admin/skin/:id", adminMiddleware, updateSkin);
userRouter.delete("/admin/skin/:id", adminMiddleware, deleteSkin);

module.exports = userRouter;