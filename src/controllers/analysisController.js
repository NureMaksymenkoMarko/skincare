const { models } = require("../models");

/**
 * @openapi
 * tags:
 *   - name: Analyses
 *     description: Analyses endpoints
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
 *     Analysis:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         analysis_type:
 *           type: string
 *           example: Photo analysis
 *         result:
 *           type: string
 *           example: Mild acne signs detected
 *         skin_id:
 *           type: integer
 *           example: 5
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-12-20T12:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-12-20T12:00:00.000Z
 *
 *     AnalysisCreateRequest:
 *       type: object
 *       required: [analysis_type, result, skin_id]
 *       properties:
 *         analysis_type:
 *           type: string
 *           example: Photo analysis
 *         result:
 *           type: string
 *           example: Mild acne signs detected
 *         skin_id:
 *           type: integer
 *           example: 5
 *
 *     AnalysisUpdateRequest:
 *       type: object
 *       properties:
 *         analysis_type:
 *           type: string
 *           example: Photo analysis (adjusted)
 *         result:
 *           type: string
 *           example: Improved skin condition
 */

/**
 * @openapi
 * /api/admin/analysis:
 *   post:
 *     tags: [Analyses]
 *     summary: Create analysis (admin)
 *     description: Requires admin privileges (adminMiddleware).
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/AnalysisCreateRequest"
 *     responses:
 *       201:
 *         description: Created analysis
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Analysis"
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
const createAnalysis = async (req, res) => {
  const { analysis_type, result, skin_id } = req.body;
  try {
    const analysis = await models.Analysis.create({
      analysis_type,
      result,
      skin_id,
    });
    res.status(201).json(analysis);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/analysis/{id}:
 *   get:
 *     tags: [Analyses]
 *     summary: Get analysis by id (authenticated)
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
 *         description: Analysis found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Analysis"
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MessageResponse"
 *       404:
 *         description: Analysis not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               error: Analysis not found
 *       400:
 *         description: Request error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
const getAnalysisById = async (req, res) => {
  const { id } = req.params;
  try {
    const analysis = await models.Analysis.findByPk(id);
    if (analysis) {
      res.json(analysis);
    } else {
      res.status(404).json({ error: "Analysis not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/analysis:
 *   get:
 *     tags: [Analyses]
 *     summary: Get all analyses (admin)
 *     description: Requires admin privileges (adminMiddleware).
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of analyses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Analysis"
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
const getAllAnalyses = async (req, res) => {
  try {
    const analyses = await models.Analysis.findAll();
    res.json(analyses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/admin/analysis/{id}:
 *   put:
 *     tags: [Analyses]
 *     summary: Update analysis (admin)
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
 *             $ref: "#/components/schemas/AnalysisUpdateRequest"
 *     responses:
 *       200:
 *         description: Updated analysis
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Analysis"
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
 *         description: Analysis not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               error: Analysis not found
 *       400:
 *         description: Request error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
const updateAnalysis = async (req, res) => {
  const { id } = req.params;
  const { analysis_type, result } = req.body;
  try {
    const analysis = await models.Analysis.findByPk(id);
    if (analysis) {
      analysis.analysis_type = analysis_type || analysis.analysis_type;
      analysis.result = result || analysis.result;
      await analysis.save();
      res.json(analysis);
    } else {
      res.status(404).json({ error: "Analysis not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/admin/analysis/{id}:
 *   delete:
 *     tags: [Analyses]
 *     summary: Delete analysis (admin)
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
 *         description: Analysis not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               error: Analysis not found
 *       400:
 *         description: Request error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
const deleteAnalysis = async (req, res) => {
  const { id } = req.params;
  try {
    const analysis = await models.Analysis.findByPk(id);
    if (analysis) {
      await analysis.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Analysis not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAnalysis,
  getAnalysisById,
  getAllAnalyses,
  updateAnalysis,
  deleteAnalysis,
};
