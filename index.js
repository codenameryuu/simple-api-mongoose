const express = require("express");
const dotenv = require("dotenv");
const formidable = require("express-formidable");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDefinition = require("./swagger.json");

const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

app.use(
  formidable({
    multiples: true,
    keepExtensions: true,
  })
);

const options = {
  swaggerDefinition,
  apis: ["./config/routes.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const routes = require("./config/routes.js");
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
