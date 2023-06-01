require("./config/database");

const router = require("express").Router();

// * Master Data -> Product Category
const ProductCategoryConntroller = require("./apps/controllers/master_data/product_category_controller");
const productCategoryConntroller = new ProductCategoryConntroller();

const productCategoryValidation = require("./apps/validations/master_data/product_category_validation");

// * Index
router.get("/product-category", productCategoryConntroller.index);

// * Store
router.post(
  "/product-category",
  productCategoryValidation.store,
  productCategoryConntroller.store
);

module.exports = router;
