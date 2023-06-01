const ProductCategory = require("../../models/ProductCategory");

class ProductCategoryService {
  // * Index service
  index = async (req) => {
    try {
      const productCategory = await ProductCategory.paginate(
        { name: "Tes" },
        {
          perPage: 1,
          page: 1,
          sort: { name: "asc" },
        }
      );

      const result = {
        status: true,
        message: "Data retrivied successfully !",
        data: productCategory,
      };

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // * Store service
  store = async (req) => {
    try {
      const productCategory = new ProductCategory();

      productCategory.name = req.body.name;

      await productCategory.save();

      const result = {
        status: true,
        message: "Data created successfully !",
        data: productCategory,
      };

      return result;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = ProductCategoryService;
