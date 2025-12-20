const { models } = require("../models");

/**
 * @openapi
 * tags:
 *   - name: Environment
 *     description: IoT environment data endpoints
 *
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: Something went wrong
 *
 *     EnvironmentData:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 7
 *         temperature:
 *           type: number
 *           example: 23.5
 *         humidity:
 *           type: number
 *           example: 45.2
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: 2025-12-20T12:00:00.000Z
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: 2025-12-20T12:00:00.000Z
 *
 *     EnvironmentDataCreateRequest:
 *       type: object
 *       required: [userId, temperature, humidity]
 *       properties:
 *         userId:
 *           type: integer
 *           example: 7
 *         temperature:
 *           type: number
 *           example: 23.5
 *         humidity:
 *           type: number
 *           example: 45.2
 */

/**
 * @openapi
 * /api/iot/environment:
 *   post:
 *     tags: [Environment]
 *     summary: Create environment data row (IoT)
 *     description: Saves temperature and humidity for a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/EnvironmentDataCreateRequest"
 *     responses:
 *       201:
 *         description: Created environment data row
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/EnvironmentData"
 *       400:
 *         description: Missing/invalid fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               error: userId, temperature, humidity are required
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               error: User not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
const createEnvironmentData = async (req, res) => {
  try {
    const { userId, temperature, humidity } = req.body;

    if (!userId || temperature == null || humidity == null) {
      return res
        .status(400)
        .json({ error: "userId, temperature, humidity are required" });
    }

    const user = await models.User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const row = await models.EnvironmentData.create({
      user_id: Number(userId),
      temperature: Number(temperature),
      humidity: Number(humidity),
    });

    return res.status(201).json(row);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/users/{userId}/environment:
 *   get:
 *     tags: [Environment]
 *     summary: Get environment data by user id
 *     description: Returns environment data rows for a user ordered by created_at DESC.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 7
 *     responses:
 *       200:
 *         description: List of environment data rows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/EnvironmentData"
 *       400:
 *         description: Invalid userId
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               error: Invalid userId
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               error: User not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
const getEnvironmentDataByUser = async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    if (!userId) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const user = await models.User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const rows = await models.EnvironmentData.findAll({
      where: { user_id: userId },
      order: [["created_at", "DESC"]],
    });

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEnvironmentData,
  getEnvironmentDataByUser,
};
