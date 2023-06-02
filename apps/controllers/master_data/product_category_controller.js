const ProductCategoryValidation = require("../../validations/master_data/product_category_validation");
const productCategoryValidation = new ProductCategoryValidation();

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

  // * Show
  show = async (req, res) => {
    const validation = await productCategoryValidation.show(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productCategoryService.show(req);

    formatResponse.sendResponse(result, res);
  };

  // * Store
  store = async (req, res) => {
    const validation = await productCategoryValidation.store(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productCategoryService.store(req);

    formatResponse.sendResponse(result, res);
  };
}

module.exports = ProductCategoryConntroller;
