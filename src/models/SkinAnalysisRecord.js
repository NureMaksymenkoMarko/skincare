const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Analysis = require("./Analysis");

const SkinAnalysisRecord = sequelize.define(
  "SkinAnalysisRecord",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    skin_condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "skin_analysis_records",
    timestamps: false,
  },
);

SkinAnalysisRecord.belongsTo(Analysis, { foreignKey: "analysis_id" });

module.exports = SkinAnalysisRecord;
