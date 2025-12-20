const sequelize = require("./config/database");
const User = require("./models/User");
const Skin = require("./models/Skin");
const Analysis = require("./models/Analysis");
const Treatment = require("./models/Treatment");
const SkinAnalysisRecord = require("./models/SkinAnalysisRecord");

function init_db(client, app) {
  client
    .connect()
    .then(() => {
      return client.query(
        `SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}'`,
      );
    })
    .then((result) => {
      if (result.rows.length === 0) {
        console.log(
          `Database ${process.env.DB_NAME} does not exist. Creating database...`,
        );
        return client.query(`CREATE DATABASE "${process.env.DB_NAME}"`);
      }
    })
    .then(() => {
      console.log(`Database ${process.env.DB_NAME} is ready.`);
      client.end();
    })
    .catch((err) => {
      console.error("Error creating database:", err);
      client.end();
    });

  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Database synced successfully");
    })
    .catch((error) => {
      console.error("Unable to sync the database:", error);
    });
}
module.exports = { init_db };
