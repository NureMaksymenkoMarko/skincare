const { models } = require("../models");

const createSkin = async (req, res) => {
  const { type, description, user_id } = req.body;
  try {
    const skin = await models.Skin.create({ type, description, user_id });
    res.status(201).json(skin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSkinById = async (req, res) => {
  const { id } = req.params;
  try {
    const skin = await models.Skin.findByPk(id);
    if (skin) {
      res.json(skin);
    } else {
      res.status(404).json({ error: "Skin record not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllSkins = async (req, res) => {
  try {
    const skins = await models.Skin.findAll();
    res.json(skins);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
  updateSkin,
  deleteSkin,
};
