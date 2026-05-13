const { models } = require("../models");

/**
 * @openapi
 * tags:
 *   - name: Analysis
 *     description: Skin analysis endpoints
 *
 * components:
 *   schemas:
 *     Analysis:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         analysis_type:
 *           type: string
 *           example: Зішкріб шкіри
 *         result:
 *           type: string
 *           example: Патологічних мікроорганізмів не виявлено.
 *         skin_id:
 *           type: integer
 *           example: 1
 */

/**
 * @openapi
 * /api/admin/analysis:
 *   post:
 *     tags: [Analysis]
 *     summary: Create analysis
 *     description: Creates a skin analysis for selected skin_id. Admin only.
 *     security:
 *       - cookieAuth: []
 */
const createAnalysis = async (req, res) => {
  const { analysis_type, result, skin_id } = req.body;

  try {
    if (!analysis_type || !result || !skin_id) {
      return res.status(400).json({
        error: "analysis_type, result and skin_id are required",
      });
    }

    const skin = await models.Skin.findByPk(skin_id);

    if (!skin) {
      return res.status(404).json({
        error: "Skin record not found",
      });
    }

    const analysis = await models.Analysis.create({
      analysis_type,
      result,
      skin_id,
    });

    return res.status(201).json(analysis);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/analysis:
 *   get:
 *     tags: [Analysis]
 *     summary: Get all analyses
 *     description: Returns all analyses. Admin only.
 *     security:
 *       - cookieAuth: []
 */
const getAllAnalyses = async (req, res) => {
  try {
    const analyses = await models.Analysis.findAll({
      order: [["id", "ASC"]],
    });

    return res.json(analyses);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/analysis/{id}:
 *   get:
 *     tags: [Analysis]
 *     summary: Get analysis by id
 *     security:
 *       - cookieAuth: []
 */
const getAnalysisById = async (req, res) => {
  const { id } = req.params;

  try {
    const analysis = await models.Analysis.findByPk(id);

    if (!analysis) {
      return res.status(404).json({ error: "Analysis not found" });
    }

    return res.json(analysis);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/skin/{skinId}/analyses:
 *   get:
 *     tags: [Analysis]
 *     summary: Get analyses by skin id
 *     security:
 *       - cookieAuth: []
 */
const getAnalysesBySkin = async (req, res) => {
  const { skinId } = req.params;

  try {
    const analyses = await models.Analysis.findAll({
      where: { skin_id: skinId },
      order: [["id", "ASC"]],
    });

    return res.json(analyses);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/users/{userId}/analysis:
 *   get:
 *     tags: [Analysis]
 *     summary: Get analyses by user id
 *     description: Returns analyses connected to the skin profile of selected user.
 *     security:
 *       - cookieAuth: []
 */
const getAnalysesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    if (Number(req.user_id) !== Number(userId)) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const skin = await models.Skin.findOne({
      where: { user_id: userId },
    });

    if (!skin) {
      return res.json([]);
    }

    const analyses = await models.Analysis.findAll({
      where: { skin_id: skin.id },
      order: [["id", "ASC"]],
    });

    return res.json(analyses);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/admin/analysis/{id}:
 *   put:
 *     tags: [Analysis]
 *     summary: Update analysis
 *     security:
 *       - cookieAuth: []
 */
const updateAnalysis = async (req, res) => {
  const { id } = req.params;
  const { analysis_type, result, skin_id } = req.body;

  try {
    const analysis = await models.Analysis.findByPk(id);

    if (!analysis) {
      return res.status(404).json({ error: "Analysis not found" });
    }

    if (skin_id) {
      const skin = await models.Skin.findByPk(skin_id);

      if (!skin) {
        return res.status(404).json({
          error: "Skin record not found",
        });
      }

      analysis.skin_id = skin_id;
    }

    if (analysis_type) analysis.analysis_type = analysis_type;
    if (result) analysis.result = result;

    await analysis.save();

    return res.json(analysis);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/**
 * @openapi
 * /api/admin/analysis/{id}:
 *   delete:
 *     tags: [Analysis]
 *     summary: Delete analysis
 *     security:
 *       - cookieAuth: []
 */
const deleteAnalysis = async (req, res) => {
  const { id } = req.params;

  try {
    const analysis = await models.Analysis.findByPk(id);

    if (!analysis) {
      return res.status(404).json({ error: "Analysis not found" });
    }

    await analysis.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAnalysis,
  getAnalysisById,
  getAllAnalyses,
  getAnalysesBySkin,
  getAnalysesByUserId,
  updateAnalysis,
  deleteAnalysis,
};