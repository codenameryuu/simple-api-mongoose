require("./database");

const router = require("express").Router();

// * Master Data -> Product Category
const ProductCategoryConntroller = require("../apps/controllers/master_data/product_category_controller");
const productCategoryConntroller = new ProductCategoryConntroller();

// * Index
router.get("/product-category", productCategoryConntroller.index);

// * Show
router.get(
  "/product-category/:product_category_id",
  productCategoryConntroller.show
);

// * Store
router.post("/product-category", productCategoryConntroller.store);

// * Update
router.put(
  "/product-category/:product_category_id",
  productCategoryConntroller.update
);

// * Delete
router.delete(
  "/product-category/:product_category_id",
  productCategoryConntroller.destroy
);

module.exports = router;
