const express = require("express");
const dotenv = require("dotenv");
const formidable = require("express-formidable");

const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

app.use(
  formidable({
    multiples: true,
    keepExtensions: true,
  })
);

const routes = require("./config/routes.js");
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
