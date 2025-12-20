const { Sequelize } = require("sequelize");

require("dotenv").config();

const host = process.env.DB_HOST;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;
const db_port = process.env.DB_PORT || 5432;

const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: host,
  dialect: "postgres",
  port: db_port,
  logging: false,
});

module.exports = sequelize;
