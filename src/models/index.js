const sequelize = require("../config/database");
const User = require("./User");
const Skin = require("./Skin");
const Analysis = require("./Analysis");
const Treatment = require("./Treatment");
const SkinAnalysisRecord = require("./SkinAnalysisRecord");
const EnvironmentData = require("./EnvironmentData");

const models = {
  User,
  Skin,
  Analysis,
  Treatment,
  SkinAnalysisRecord,
  EnvironmentData,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = { sequelize, models };
