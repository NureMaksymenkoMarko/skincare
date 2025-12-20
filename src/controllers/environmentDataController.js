const { models } = require("../models");

const createEnvironmentData = async (req, res) => {
  try {
    const { userId, temperature, humidity } = req.body;

    if (!userId || temperature == null || humidity == null) {
      return res
        .status(400)
        .json({ error: "userId, temperature, humidity are required" });
    }

    const user = await models.User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const row = await models.EnvironmentData.create({
      user_id: Number(userId),
      temperature: Number(temperature),
      humidity: Number(humidity),
    });

    return res.status(201).json(row);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getEnvironmentDataByUser = async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    if (!userId) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const user = await models.User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const rows = await models.EnvironmentData.findAll({
      where: { user_id: userId },
      order: [["created_at", "DESC"]],
    });

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEnvironmentData,
  getEnvironmentDataByUser,
};
