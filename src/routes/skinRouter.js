const express = require("express");
const userRouter = express.Router();

const authMiddleware = require("../middleware/auth.js");

const {
  getSkinById,
  getSkinByUserId,
  getMySkin,
} = require("../controllers/skinController");

userRouter.get("/users/me/skin", authMiddleware, getMySkin);
userRouter.get("/skin/:id", authMiddleware, getSkinById);
userRouter.get("/users/:userId/skin", authMiddleware, getSkinByUserId);

module.exports = userRouter;