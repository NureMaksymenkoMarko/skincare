const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Skin = require("./Skin");

const Analysis = sequelize.define(
  "Analysis",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    analysis_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    result: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "analyses",
    timestamps: false,
  },
);

Analysis.belongsTo(Skin, { foreignKey: "skin_id" });

module.exports = Analysis;
