const isset = require("isset-php");
const Product = require("../../Models/Product");

class ProductService {
  // * Index service
  index = async (req) => {
    try {
      let setting = {
        page: 1,
        limit: 1,
        sort: { name: "asc" },
      };

      let conditional = {};

      if (isset(() => req.query.page) && req.query.page) {
        setting.page = parseInt(req.query.page);
      }

      if (isset(() => req.query.limit) && req.query.limit) {
        setting.limit = parseInt(req.query.limit);
      }

      if (isset(() => req.query.search) && req.query.search) {
        conditional.name = req.query.search;
      }

      const product = await Product.paginate(conditional, setting);

      const result = {
        status: true,
        message: "Data retrivied successfully !",
        data: product,
      };

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // * Show service
  show = async (req) => {
    try {
      const product = await Product.findOne({
        _id: req.params.product_id,
      });

      const result = {
        status: true,
        message: "Data retrivied successfully !",
        data: product,
      };

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // * Store service
  store = async (req) => {
    try {
      const product = new Product();

      product.product_category_id = req.body.product_category_id;
      product.name = req.body.name;
      product.price = req.body.price;

      await product.save();

      const result = {
        status: true,
        message: "Data created successfully !",
        data: product,
      };

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // * Update service
  update = async (req) => {
    try {
      const product = await Product.findOne({
        _id: req.params.product_id,
      });

      product.name = req.body.name;

      await product.save();

      const result = {
        status: true,
        message: "Data updated successfully !",
        data: product,
      };

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // * Destroy service
  destroy = async (req) => {
    try {
      await Product.deleteMany({
        _id: req.params.product_id,
      });

      const result = {
        status: true,
        message: "Data deleted successfully !",
      };

      return result;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = ProductService;
