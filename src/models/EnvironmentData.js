const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const EnvironmentData = sequelize.define(
  "EnvironmentData",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    humidity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "environment_data",
    timestamps: false,
  },
);

EnvironmentData.belongsTo(User, { foreignKey: "user_id" });

module.exports = EnvironmentData;
