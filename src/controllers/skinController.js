const { models } = require("../models");

/**
 * @openapi
 * tags:
 *   - name: Skins
 *     description: Skin management endpoints
 *
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: access
 *       description: HttpOnly cookie "access" with JWT
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
 *           example: Not authorized
 *
 *     Skin:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         type:
 *           type: string
 *           example: Oily
 *         description:
 *           type: string
 *           example: Increased sebum production, prone to acne
 *         user_id:
 *           type: integer
 *           example: 7
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-12-20T12:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-12-20T12:00:00.000Z
 *
 *     SkinCreateRequest:
 *       type: object
 *       required: [type, description, user_id]
 *       properties:
 *         type:
 *           type: string
 *           example: Oily
 *         description:
 *           type: string
 *           example: Increased sebum production, prone to acne
 *         user_id:
 *           type: integer
 *           example: 7
 *
 *     SkinUpdateRequest:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           example: Combination
 *         description:
 *           type: string
 *           example: Oily T-zone and normal cheeks
 */

/**
 * @openapi
 * /api/admin/skin:
 *   post:
 *     tags: [Skins]
 *     summary: Create skin record (admin)
 *     description: Requires admin privileges (adminMiddleware).
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SkinCreateRequest"
 *     responses:
 *       201:
 *         description: Created skin record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Skin"
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MessageResponse"
 *       403:
 *         description: Forbidden (not admin)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MessageResponse"
 *       400:
 *         description: Validation/creation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
const createSkin = async (req, res) => {
  const { type, description, user_id } = req.body;
  try {
    const skin = await models.Skin.create({ type, description, user_id });
    res.status(201).json(skin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/skin/{id}:
 *   get:
 *     tags: [Skins]
 *     summary: Get skin record by id (authenticated)
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
 *         description: Skin record found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Skin"
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MessageResponse"
 *       404:
 *         description: Skin record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               error: Skin record not found
 *       400:
 *         description: Request error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
const getSkinByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const skin = await models.Skin.findOne({ where: { user_id: userId } });
    if (skin) {
      res.json(skin);
    } else {
      res.status(404).json({ error: "Skin record not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/skin:
 *   get:
 *     tags: [Skins]
 *     summary: Get all skin records (admin)
 *     description: Requires admin privileges (adminMiddleware).
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of skin records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Skin"
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MessageResponse"
 *       403:
 *         description: Forbidden (not admin)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MessageResponse"
 *       400:
 *         description: Request error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
const getAllSkins = async (req, res) => {
  try {
    const skins = await models.Skin.findAll();
    res.json(skins);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/admin/skin/{id}:
 *   put:
 *     tags: [Skins]
 *     summary: Update skin record (admin)
 *     description: Requires admin privileges (adminMiddleware).
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
 *             $ref: "#/components/schemas/SkinUpdateRequest"
 *     responses:
 *       200:
 *         description: Updated skin record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Skin"
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MessageResponse"
 *       403:
 *         description: Forbidden (not admin)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MessageResponse"
 *       404:
 *         description: Skin record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               error: Skin record not found
 *       400:
 *         description: Request error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
const updateSkin = async (req, res) => {
  const { id } = req.params;
  const { type, description } = req.body;
  try {
    const skin = await models.Skin.findByPk(id);
    if (skin) {
      skin.type = type || skin.type;
      skin.description = description || skin.description;
      await skin.save();
      res.json(skin);
    } else {
      res.status(404).json({ error: "Skin record not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/admin/skin/{id}:
 *   delete:
 *     tags: [Skins]
 *     summary: Delete skin record (admin)
 *     description: Requires admin privileges (adminMiddleware).
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
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MessageResponse"
 *       403:
 *         description: Forbidden (not admin)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MessageResponse"
 *       404:
 *         description: Skin record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               error: Skin record not found
 *       400:
 *         description: Request error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
const deleteSkin = async (req, res) => {
  const { id } = req.params;
  try {
    const skin = await models.Skin.findByPk(id);
    if (skin) {
      await skin.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Skin record not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createSkin,
  getSkinById,
  getAllSkins,
  getSkinByUserId,
  updateSkin,
  deleteSkin,
};
