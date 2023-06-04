const Joi = require("joi");
const mongoose = require("mongoose");
const isset = require("isset-php");
const ProductCategory = require("../../Models/ProductCategory");

class ProductCategoryValidation {
  // * Index validation
  index = async (req) => {
    let status, message;

    const schema = Joi.object({
      page: Joi.number().optional(),
      limit: Joi.number().optional(),
      search: Joi.string().optional(),
    });

    try {
      let validate = {};

      if (isset(() => req.query.page) && req.query.page) {
        validate.page = req.query.page;
      }

      if (isset(() => req.query.limit) && req.query.limit) {
        validate.limit = req.query.limit;
      }

      if (isset(() => req.query.search) && req.query.search) {
        validate.search = req.query.search;
      }

      await schema.validateAsync(validate);

      status = true;
      message = "Validation successfully !";
    } catch (err) {
      status = false;
      message = err.details[0].message;
    }

    const result = {
      status: status,
      message: message,
    };

    return result;
  };

  // * Show validation
  show = async (req) => {
    let status, message;

    const schema = Joi.object({
      product_category_id: Joi.string()
        .required()
        .external(async (product_category_id) => {
          const check = mongoose.isValidObjectId(product_category_id);

          if (!check) {
            throw new Joi.ValidationError(
              "Check product_category_id is valid object id",
              [
                {
                  message: `"product_category_id" is not valid object id`,
                },
              ],
              product_category_id
            );
          }

          const productCategory = await ProductCategory.findOne({
            _id: product_category_id,
          });

          if (!productCategory) {
            throw new Joi.ValidationError(
              "Check is data exists in database",
              [
                {
                  message: `"product_category_id" is not exists`,
                },
              ],
              product_category_id
            );
          }

          return product_category_id;
        }),
    });

    try {
      const validate = {
        product_category_id: req.params.product_category_id,
      };

      await schema.validateAsync(validate);

      status = true;
      message = "Validation successfully !";
    } catch (err) {
      status = false;
      message = err.details[0].message;
    }

    const result = {
      status: status,
      message: message,
    };

    return result;
  };

  // * Store validation
  store = async (req) => {
    let status, message;

    const schema = Joi.object({
      name: Joi.string().required(),
    });

    try {
      const validate = {
        name: req.body.name,
      };

      await schema.validateAsync(validate);

      status = true;
      message = "Validation successfully !";
    } catch (err) {
      status = false;
      message = err.details[0].message;
      console.log(message);
    }

    const result = {
      status: status,
      message: message,
    };

    return result;
  };

  // * Update validation
  update = async (req) => {
    let status, message;

    const schema = Joi.object({
      product_category_id: Joi.string()
        .required()
        .external(async (product_category_id) => {
          const check = mongoose.isValidObjectId(product_category_id);

          if (!check) {
            throw new Joi.ValidationError(
              "Check product_category_id is valid object id",
              [
                {
                  message: `"product_category_id" is not valid object id`,
                },
              ],
              product_category_id
            );
          }

          const productCategory = await ProductCategory.findOne({
            _id: product_category_id,
          });

          if (!productCategory) {
            throw new Joi.ValidationError(
              "Check is data exists in database",
              [
                {
                  message: `"product_category_id" is not exists`,
                },
              ],
              product_category_id
            );
          }

          return product_category_id;
        }),

      name: Joi.string().required(),
    });

    try {
      const validate = {
        product_category_id: req.params.product_category_id,
        name: req.body.name,
      };

      await schema.validateAsync(validate);

      status = true;
      message = "Validation successfully !";
    } catch (err) {
      status = false;
      message = err.details[0].message;
      console.log(message);
    }

    const result = {
      status: status,
      message: message,
    };

    return result;
  };

  // * Destroy validation
  destroy = async (req) => {
    let status, message;

    const schema = Joi.object({
      product_category_id: Joi.string()
        .required()
        .external(async (product_category_id) => {
          const check = mongoose.isValidObjectId(product_category_id);

          if (!check) {
            throw new Joi.ValidationError(
              "Check product_category_id is valid object id",
              [
                {
                  message: `"product_category_id" is not valid object id`,
                },
              ],
              product_category_id
            );
          }

          const productCategory = await ProductCategory.findOne({
            _id: product_category_id,
          });

          if (!productCategory) {
            throw new Joi.ValidationError(
              "Check is data exists in database",
              [
                {
                  message: `"product_category_id" is not exists`,
                },
              ],
              product_category_id
            );
          }

          return product_category_id;
        }),
    });

    try {
      const validate = {
        product_category_id: req.params.product_category_id,
      };

      await schema.validateAsync(validate);

      status = true;
      message = "Validation successfully !";
    } catch (err) {
      status = false;
      message = err.details[0].message;
    }

    const result = {
      status: status,
      message: message,
    };

    return result;
  };
}

module.exports = ProductCategoryValidation;
