const { models } = require("../models");

const createAnalysis = async (req, res) => {
  const { analysis_type, result, skin_id } = req.body;
  try {
    const analysis = await models.Analysis.create({ analysis_type, result, skin_id });
    res.status(201).json(analysis);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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

const getAllAnalyses = async (req, res) => {
  try {
    const analyses = await models.Analysis.findAll();
    res.json(analyses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAnalysesBySkin = async (req, res) => {
  const { skinId } = req.params;
  try {
    const analyses = await models.Analysis.findAll({
      where: { skin_id: skinId }
    });
    res.json(analyses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
  getAnalysesBySkin,
  updateAnalysis,
  deleteAnalysis,
};
