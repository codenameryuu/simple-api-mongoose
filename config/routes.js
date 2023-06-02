require("./database");

const router = require("express").Router();

// * Master Data -> Product Category
const ProductCategoryConntroller = require("../apps/controllers/master_data/product_category_controller");
const productCategoryConntroller = new ProductCategoryConntroller();

// * Index
router.get("/product-category", productCategoryConntroller.index);

// * Show
router.get("/product-category/show", productCategoryConntroller.show);

// * Store
router.post("/product-category", productCategoryConntroller.store);

module.exports = router;
