const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static("public"));

const routes = require("./config/routes.js");
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
