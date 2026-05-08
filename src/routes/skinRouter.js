const express = require("express");
const userRouter = express.Router();

const adminMiddleware = require("../middleware/isAdmin.js");
const authMiddleware = require("../middleware/auth.js");

const { 
  getSkinById, 
  getAllSkins, 
  getSkinByUserId 
} = require("../controllers/skinController");

userRouter.get("/skin", adminMiddleware, getAllSkins);
userRouter.get("/skin/:id", authMiddleware, getSkinById);
userRouter.get("/users/:userId/skin", authMiddleware, getSkinByUserId);

module.exports = userRouter;
