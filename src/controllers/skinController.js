const { models } = require("../models");

/**
 * @openapi
 * tags:
 *   - name: Skin
 *     description: Skin profile endpoints
 *
 * components:
 *   schemas:
 *     Skin:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         type:
 *           type: string
 *           example: Не визначено
 *         description:
 *           type: string
 *           example: Картка шкіри користувача
 *         user_id:
 *           type: integer
 *           example: 1
 *
 *     CreateSkinRequest:
 *       type: object
 *       required: [type, description, user_id]
 *       properties:
 *         type:
 *           type: string
 *           example: Dry
 *         description:
 *           type: string
 *           example: Суха шкіра, потребує зволоження
 *         user_id:
 *           type: integer
 *           example: 1
 *
 *     UpdateSkinRequest:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           example: Oily
 *         description:
 *           type: string
 *           example: Жирна шкіра у T-зоні
 */

/**
 * @openapi
 * /api/admin/skin:
 *   post:
 *     tags: [Skin]
 *     summary: Create skin profile
 *     description: Creates a skin profile for a user. Admin only.
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateSkinRequest"
 *     responses:
 *       201:
 *         description: Skin profile created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Skin"
 *       400:
 *         description: Request error
 */
const createSkin = async (req, res) => {
  const { type, description, user_id } = req.body;

  try {
    const skin = await models.Skin.create({
      type,
      description,
      user_id,
    });

    return res.status(201).json(skin);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/skin:
 *   get:
 *     tags: [Skin]
 *     summary: Get all skin profiles
 *     description: Returns all skin profiles. Admin only.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of skin profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Skin"
 *       400:
 *         description: Request error
 */
const getAllSkins = async (req, res) => {
  try {
    const skins = await models.Skin.findAll({
      order: [["id", "ASC"]],
    });

    return res.json(skins);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/skin/{id}:
 *   get:
 *     tags: [Skin]
 *     summary: Get skin profile by id
 *     description: Returns one skin profile by skin id.
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
 *         description: Skin profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Skin"
 *       404:
 *         description: Skin record not found
 *       400:
 *         description: Request error
 */
const getSkinById = async (req, res) => {
  const { id } = req.params;

  try {
    const skin = await models.Skin.findByPk(id);

    if (!skin) {
      return res.status(404).json({ error: "Skin record not found" });
    }

    return res.json(skin);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/users/{userId}/skin:
 *   get:
 *     tags: [Skin]
 *     summary: Get skin profile by user id
 *     description: Returns skin profile connected to a specific user.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Skin profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Skin"
 *       404:
 *         description: Skin record not found
 *       400:
 *         description: Request error
 */
const getSkinByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const skin = await models.Skin.findOne({
      where: { user_id: userId },
    });

    if (!skin) {
      return res.status(404).json({ error: "Skin record not found" });
    }

    return res.json(skin);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/users/me/skin:
 *   get:
 *     tags: [Skin]
 *     summary: Get current user skin profile
 *     description: Returns skin profile connected to the currently authenticated user.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current user's skin profile or null if it does not exist
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: "#/components/schemas/Skin"
 *                 - type: "null"
 *       400:
 *         description: Request error
 */
const getMySkin = async (req, res) => {
  const userId = req.user_id;

  try {
    const skin = await models.Skin.findOne({
      where: { user_id: userId },
    });

    if (!skin) {
      return res.json(null);
    }

    return res.json(skin);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/admin/skin/{id}:
 *   put:
 *     tags: [Skin]
 *     summary: Update skin profile
 *     description: Updates skin profile by id. Admin only.
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
 *             $ref: "#/components/schemas/UpdateSkinRequest"
 *     responses:
 *       200:
 *         description: Updated skin profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Skin"
 *       404:
 *         description: Skin record not found
 *       400:
 *         description: Request error
 */
const updateSkin = async (req, res) => {
  const { id } = req.params;
  const { type, description } = req.body;

  try {
    const skin = await models.Skin.findByPk(id);

    if (!skin) {
      return res.status(404).json({ error: "Skin record not found" });
    }

    if (type) skin.type = type;

    if (description !== undefined) {
      skin.description = description;
    }

    await skin.save();

    return res.json(skin);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/admin/skin/{id}:
 *   delete:
 *     tags: [Skin]
 *     summary: Delete skin profile
 *     description: Deletes skin profile by id. Admin only.
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
 *         description: Deleted successfully
 *       404:
 *         description: Skin record not found
 *       400:
 *         description: Request error
 */
const deleteSkin = async (req, res) => {
  const { id } = req.params;

  try {
    const skin = await models.Skin.findByPk(id);

    if (!skin) {
      return res.status(404).json({ error: "Skin record not found" });
    }

    await skin.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createSkin,
  getSkinById,
  getSkinByUserId,
  getMySkin,
  getAllSkins,
  updateSkin,
  deleteSkin,
};