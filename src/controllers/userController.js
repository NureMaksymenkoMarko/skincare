const { models } = require("../models");
const { hashPassword, comparePasswords } = require("../utils/passwordHasher");
const jwt = require("jsonwebtoken");

const TOKEN_MAX_AGE = 60 * 60 * 3 * 1000;
const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: TOKEN_MAX_AGE,
};

/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 *   - name: Users
 *     description: User endpoints
 *
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: access
 *       description: HttpOnly cookie "access" that contains JWT
 *
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: Something went wrong
 *
 *     MessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Login successful
 *
 *     LoginRequest:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         password:
 *           type: string
 *           example: Qwerty123!
 *
 *     RegisterRequest:
 *       type: object
 *       required: [name, email, password]
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         password:
 *           type: string
 *           example: Qwerty123!
 *
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: New Name
 *         email:
 *           type: string
 *           format: email
 *           example: newemail@example.com
 *         password:
 *           type: string
 *           example: NewPass123!
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-12-20T12:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-12-20T12:00:00.000Z
 */

/**
 * @openapi
 * /api/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     description: Validates credentials and sets HttpOnly cookie "access" with JWT (expires in 3h).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginRequest"
 *     responses:
 *       200:
 *         description: Login successful (cookie is set)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MessageResponse"
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
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

    res.cookie("access", token, COOKIE_OPTIONS);

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register new user
 *     description: Creates user, hashes password, sets HttpOnly cookie "access" with JWT (expires in 3h). Returns user without password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RegisterRequest"
 *     responses:
 *       201:
 *         description: Created user (without password)
 *       400:
 *         description: Validation/creation error
 */
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

    res.cookie("access", token, COOKIE_OPTIONS);

    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.password;

    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/users/me:
 *   get:
 *     tags: [Users]
 *     summary: Get current user by token (cookie)
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current user (without password)
 *       404:
 *         description: User not found
 *       400:
 *         description: Request error
 */
const getUserByToken = async (req, res) => {
  const id = Number(req.user_id);

  try {
    const user = await models.User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.password;

    return res.json(userWithoutPassword);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by id
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: User (without password)
 *       404:
 *         description: User not found
 *       400:
 *         description: Request error
 */
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await models.User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.password;

    return res.json(userWithoutPassword);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of users (without password)
 *       400:
 *         description: Request error
 */
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

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update user
 *     description: Updates user if requester is the same user (req.user_id must match :id). If password is provided, it will be hashed.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateUserRequest"
 *     responses:
 *       200:
 *         description: Updated user (without password)
 *       401:
 *         description: Not authorized
 *       404:
 *         description: User not found
 *       400:
 *         description: Request error
 */
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    if (req.user_id != id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await models.User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      user.password = await hashPassword(password, 10);
    }

    await user.save();

    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.password;

    return res.json(userWithoutPassword);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       204:
 *         description: Deleted successfully (no content)
 *       404:
 *         description: User not found
 *       400:
 *         description: Request error
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await models.User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
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