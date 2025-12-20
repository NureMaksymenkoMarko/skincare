const { models } = require("../models");

/**
 * @openapi
 * tags:
 *   - name: Treatments
 *     description: Treatment endpoints
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
 *     Treatment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         treatment_type:
 *           type: string
 *           example: Retinoid course
 *         start_date:
 *           type: string
 *           format: date
 *           example: 2025-12-01
 *         end_date:
 *           type: string
 *           format: date
 *           example: 2026-01-15
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
 *     TreatmentCreateRequest:
 *       type: object
 *       required: [treatment_type, start_date, end_date, user_id]
 *       properties:
 *         treatment_type:
 *           type: string
 *           example: Retinoid course
 *         start_date:
 *           type: string
 *           format: date
 *           example: 2025-12-01
 *         end_date:
 *           type: string
 *           format: date
 *           example: 2026-01-15
 *         user_id:
 *           type: integer
 *           example: 7
 *
 *     TreatmentUpdateRequest:
 *       type: object
 *       properties:
 *         treatment_type:
 *           type: string
 *           example: Retinoid course (adjusted)
 *         start_date:
 *           type: string
 *           format: date
 *           example: 2025-12-10
 *         end_date:
 *           type: string
 *           format: date
 *           example: 2026-02-01
 */

/**
 * @openapi
 * /api/admin/treatment:
 *   post:
 *     tags: [Treatments]
 *     summary: Create a treatment (admin)
 *     description: Requires admin privileges (adminMiddleware).
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TreatmentCreateRequest"
 *     responses:
 *       201:
 *         description: Created treatment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Treatment"
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
const createTreatment = async (req, res) => {
  const { treatment_type, start_date, end_date, user_id } = req.body;
  try {
    const treatment = await models.Treatment.create({
      treatment_type,
      start_date,
      end_date,
      user_id,
    });
    res.status(201).json(treatment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/treatment/{id}:
 *   get:
 *     tags: [Treatments]
 *     summary: Get treatment by id
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
 *         description: Treatment found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Treatment"
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MessageResponse"
 *       404:
 *         description: Treatment not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               error: Treatment not found
 *       400:
 *         description: Request error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
const getTreatmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const treatment = await models.Treatment.findByPk(id);
    if (treatment) {
      res.json(treatment);
    } else {
      res.status(404).json({ error: "Treatment not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/treatment:
 *   get:
 *     tags: [Treatments]
 *     summary: Get all treatments (admin)
 *     description: Requires admin privileges (adminMiddleware).
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of treatments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Treatment"
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
const getAllTreatments = async (req, res) => {
  try {
    const treatments = await models.Treatment.findAll();
    res.json(treatments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/admin/treatment/{id}:
 *   put:
 *     tags: [Treatments]
 *     summary: Update treatment (admin)
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
 *             $ref: "#/components/schemas/TreatmentUpdateRequest"
 *     responses:
 *       200:
 *         description: Updated treatment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Treatment"
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
 *         description: Treatment not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               error: Treatment not found
 *       400:
 *         description: Request error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
const updateTreatment = async (req, res) => {
  const { id } = req.params;
  const { treatment_type, start_date, end_date } = req.body;
  try {
    const treatment = await models.Treatment.findByPk(id);
    if (treatment) {
      treatment.treatment_type = treatment_type || treatment.treatment_type;
      treatment.start_date = start_date || treatment.start_date;
      treatment.end_date = end_date || treatment.end_date;
      await treatment.save();
      res.json(treatment);
    } else {
      res.status(404).json({ error: "Treatment not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/admin/treatment/{id}:
 *   delete:
 *     tags: [Treatments]
 *     summary: Delete treatment (admin)
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
 *         description: Treatment not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               error: Treatment not found
 *       400:
 *         description: Request error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
const deleteTreatment = async (req, res) => {
  const { id } = req.params;
  try {
    const treatment = await models.Treatment.findByPk(id);
    if (treatment) {
      await treatment.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Treatment not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTreatment,
  getTreatmentById,
  getAllTreatments,
  updateTreatment,
  deleteTreatment,
};
