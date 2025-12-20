const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
  },
  apis: [
    "./src/controllers/*.js",
    "./src/routes/*.js",
  ],
};

module.exports = swaggerJSDoc(options);
