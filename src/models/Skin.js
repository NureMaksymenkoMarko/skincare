const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Skin = sequelize.define(
  "Skin",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "skins",
    timestamps: false,
  },
);

Skin.belongsTo(User, { foreignKey: "user_id" });

module.exports = Skin;
