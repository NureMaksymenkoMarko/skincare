const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Treatment = sequelize.define(
  "Treatment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    treatment_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "treatments",
    timestamps: false,
  },
);

Treatment.belongsTo(User, { foreignKey: "user_id" });

module.exports = Treatment;
