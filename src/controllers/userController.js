const { models } = require("../models");
const { hashPassword, comparePasswords } = require("../utils/passwordHasher");
const jwt = require("jsonwebtoken");

const TOKEN_MAX_AGE = 60 * 60 * 3 * 1000;

const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await models.User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "3h" });

    res.cookie("access", token, {
      httpOnly: true,
      maxAge: TOKEN_MAX_AGE,
    });
    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed_password = await hashPassword(password, 10);
    const user = await models.User.create({
      name,
      email,
      password: hashed_password,
    });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "3h" });

    res.cookie("access", token, {
      httpOnly: true,
      maxAge: TOKEN_MAX_AGE,
    });

    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.password;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await models.User.findByPk(id);
    if (user) {
      const userWithoutPassword = { ...user.toJSON() };
      delete userWithoutPassword.password;

      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserByToken = async (req, res) => {
  const id = Number(req.user_id);

  try {
    const user = await models.User.findByPk(id);
    if (user) {
      const userWithoutPassword = { ...user.toJSON() };
      delete userWithoutPassword.password;

      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const usersWithoutPassword = await models.User.findAll({
      attributes: { exclude: ["password"] },
    });

    return res.json(usersWithoutPassword);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    if (req.user_id != id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await models.User.findByPk(id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
      await user.save();
      const userWithoutPassword = { ...user.toJSON() };
      delete userWithoutPassword.password;

      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await models.User.findByPk(id);
    if (user) {
      await user.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser: register,
  getUserByToken,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  login,
};
