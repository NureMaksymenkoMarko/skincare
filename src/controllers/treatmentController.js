const { models } = require("../models");

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

const getAllTreatments = async (req, res) => {
  try {
    const treatments = await models.Treatment.findAll();
    res.json(treatments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
