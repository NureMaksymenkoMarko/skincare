const { models } = require("../models");

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

const getAllSkinAnalysisRecords = async (req, res) => {
  try {
    const records = await models.SkinAnalysisRecord.findAll();
    res.json(records);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
