const { body } = require("express-validator");

const store = [body("name").notEmpty().withMessage("Name is required")];

const result = { store };

module.exports = result;
