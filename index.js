const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();

const route = require("./routes");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static("public"));
app.use(route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
