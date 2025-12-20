const { models } = require("../models");

/**
 * @openapi
 * tags:
 *   - name: Records
 *     description: Skin analysis records endpoints
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
 *     SkinAnalysisRecord:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         skin_condition:
 *           type: string
 *           example: Dryness and redness
 *         date:
 *           type: string
 *           format: date
 *           example: 2025-12-20
 *         analysis_id:
 *           type: integer
 *           example: 3
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-12-20T12:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-12-20T12:00:00.000Z
 *
 *     SkinAnalysisRecordCreateRequest:
 *       type: object
 *       required: [skin_condition, date, analysis_id]
 *       properties:
 *         skin_condition:
 *           type: string
 *           example: Dryness and redness
 *         date:
 *           type: string
 *           format: date
 *           example: 2025-12-20
 *         analysis_id:
 *           type: integer
 *           example: 3
 *
 *     SkinAnalysisRecordUpdateRequest:
 *       type: object
 *       properties:
 *         skin_condition:
 *           type: string
 *           example: Redness decreased
 *         date:
 *           type: string
 *           format: date
 *           example: 2025-12-21
 */

/**
 * @openapi
 * /api/admin/record:
 *   post:
 *     tags: [Records]
 *     summary: Create skin analysis record (admin)
 *     description: Requires admin privileges (adminMiddleware).
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SkinAnalysisRecordCreateRequest"
 *     responses:
 *       201:
 *         description: Created record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SkinAnalysisRecord"
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
const createSkinAnalysisRecord = async (req, res) => {
  const { skin_condition, date, analysis_id } = req.body;
  try {
    const record = await models.SkinAnalysisRecord.create({
      skin_condition,
      date,
      analysis_id,
    });
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/record/{id}:
 *   get:
 *     tags: [Records]
 *     summary: Get skin analysis record by id (authenticated)
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
 *         description: Record found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SkinAnalysisRecord"
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MessageResponse"
 *       404:
 *         description: Record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               error: Skin analysis record not found
 *       400:
 *         description: Request error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
const getSkinAnalysisRecordById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await models.SkinAnalysisRecord.findByPk(id);
    if (record) {
      res.json(record);
    } else {
      res.status(404).json({ error: "Skin analysis record not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/record:
 *   get:
 *     tags: [Records]
 *     summary: Get all skin analysis records (admin)
 *     description: Requires admin privileges (adminMiddleware).
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/SkinAnalysisRecord"
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
const getAllSkinAnalysisRecords = async (req, res) => {
  try {
    const records = await models.SkinAnalysisRecord.findAll();
    res.json(records);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/admin/record/{id}:
 *   put:
 *     tags: [Records]
 *     summary: Update skin analysis record (admin)
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
 *             $ref: "#/components/schemas/SkinAnalysisRecordUpdateRequest"
 *     responses:
 *       200:
 *         description: Updated record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SkinAnalysisRecord"
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
 *         description: Record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               error: Skin analysis record not found
 *       400:
 *         description: Request error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
const updateSkinAnalysisRecord = async (req, res) => {
  const { id } = req.params;
  const { skin_condition, date } = req.body;
  try {
    const record = await models.SkinAnalysisRecord.findByPk(id);
    if (record) {
      record.skin_condition = skin_condition || record.skin_condition;
      record.date = date || record.date;
      await record.save();
      res.json(record);
    } else {
      res.status(404).json({ error: "Skin analysis record not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/admin/record/{id}:
 *   delete:
 *     tags: [Records]
 *     summary: Delete skin analysis record (admin)
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
 *         description: Record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               error: Skin analysis record not found
 *       400:
 *         description: Request error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
const deleteSkinAnalysisRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await models.SkinAnalysisRecord.findByPk(id);
    if (record) {
      await record.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Skin analysis record not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createSkinAnalysisRecord,
  getSkinAnalysisRecordById,
  getAllSkinAnalysisRecords,
  updateSkinAnalysisRecord,
  deleteSkinAnalysisRecord,
};
