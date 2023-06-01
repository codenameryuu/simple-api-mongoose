const { validationResult } = require("express-validator");

const ProductCategoryService = require("../../services/master_data/product_category_service");
const productCategoryService = new ProductCategoryService();

const FormatResponse = require("../../traits/format_response");
const formatResponse = new FormatResponse();

class ProductCategoryConntroller {
  // * Index
  index = async (req, res) => {
    const result = await productCategoryService.index();

    formatResponse.sendResponse(result, res);
  };

  // * Store
  store = async (req, res) => {
    const validation = validationResult(req);
    const error = validation.array()[0];

    if (error) {
      formatResponse.validate(error, res);
      return;
    }

    const result = await productCategoryService.store(req);

    formatResponse.sendResponse(result, res);
  };
}

module.exports = ProductCategoryConntroller;
