const ProductValidation = require("../../Validations/MasterData/ProductValidation");
const productValidation = new ProductValidation();

const ProductService = require("../../Services/MasterData/ProductService");
const productService = new ProductService();

const FormatResponse = require("../../Traits/FormatResponse");
const formatResponse = new FormatResponse();

class ProductConntroller {
  // * Index
  index = async (req, res) => {
    const validation = await productValidation.index(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productService.index(req);

    formatResponse.sendResponse(result, res);
  };

  // * Show
  show = async (req, res) => {
    const validation = await productValidation.show(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productService.show(req);

    formatResponse.sendResponse(result, res);
  };

  // * Store
  store = async (req, res) => {
    const validation = await productValidation.store(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productService.store(req);

    formatResponse.sendResponse(result, res);
  };

  // * Update
  update = async (req, res) => {
    const validation = await productValidation.update(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productService.update(req);

    formatResponse.sendResponse(result, res);
  };

  // * Destroy
  destroy = async (req, res) => {
    const validation = await productValidation.destroy(req);

    if (!validation.status) {
      formatResponse.sendResponse(validation, res);
      return;
    }

    const result = await productService.destroy(req);

    formatResponse.sendResponse(result, res);
  };
}

module.exports = ProductConntroller;
