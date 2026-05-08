const express = require("express");
const userRouter = express.Router();

const authMiddleware = require("../middleware/auth.js");

const {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  getUserByToken,
  getAllUsers,
} = require("../controllers/userController");

userRouter.post("/login", login);
userRouter.post("/register", createUser);
userRouter.get("/users/me", authMiddleware, getUserByToken);
userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", authMiddleware, getUserById);
userRouter.put("/users/:id", authMiddleware, updateUser);
userRouter.delete("/users/:id", authMiddleware, deleteUser);

module.exports = userRouter;
