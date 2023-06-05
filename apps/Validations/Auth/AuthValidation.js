const Joi = require("joi");
const mongoose = require("mongoose");
const User = require("../../Models/User");

class ProductCategoryValidation {
  // * Login validation
  login = async (req) => {
    let status, message;

    const schema = Joi.object({
      email: Joi.string()
        .email()
        .required()
        .external(async (email) => {
          const user = await User.findOne({
            email: email,
          });

          if (!user) {
            throw new Joi.ValidationError(
              "Check is data exists in database",
              [
                {
                  message: `"email" is not exists`,
                },
              ],
              email
            );
          }

          return email;
        }),

      password: Joi.string().required(),
    });

    try {
      let validate = {
        email: req.fields.email,
        password: req.fields.password,
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

  // * Register validation
  register = async (req) => {
    let status, message;

    const schema = Joi.object({
      name: Joi.string().required(),

      email: Joi.string()
        .email()
        .required()
        .external(async (email) => {
          const user = await User.findOne({
            email: email,
          });

          if (user) {
            throw new Joi.ValidationError(
              "Check is data exists in database",
              [
                {
                  message: `"email" is already exists`,
                },
              ],
              email
            );
          }

          return email;
        }),

      password: Joi.string().required(),
      image: Joi.optional(),
    });

    try {
      let validate = {
        name: req.fields.name,
        email: req.fields.email,
        password: req.fields.password,
        image: req.fields.image,
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
