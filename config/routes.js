const router = require("express").Router();
const auth = require("../apps/Middleware/Auth");
require("express-group-routes");
require("./database");

// * Auth
const AuthController = require("../apps/Controllers/Auth/AuthController");
const authController = new AuthController();

router.post("/login", authController.login);
router.post("/register", authController.register);

// * Master Data -> Product Category
const ProductCategoryConntroller = require("../apps/Controllers/MasterData/ProductCategoryConntroller");
const productCategoryConntroller = new ProductCategoryConntroller();

router.group("/product-category", (router) => {
  // * User JWT Auth
  router.use(auth);

  // * Index
  router.get("", productCategoryConntroller.index);

  // * Show
  router.get("/:product_category_id", productCategoryConntroller.show);

  // * Store
  router.post("", productCategoryConntroller.store);

  // * Update
  router.put("/:product_category_id", productCategoryConntroller.update);

  // * Delete
  router.delete("/:product_category_id", productCategoryConntroller.destroy);
});

// * Master Data -> Product
const ProductConntroller = require("../apps/Controllers/MasterData/ProductConntroller");
const productConntroller = new ProductConntroller();

router.group("/product", (router) => {
  // * User JWT Auth
  router.use(auth);

  // * Index
  router.get("", productConntroller.index);

  // * Show
  router.get("/:product_id", productConntroller.show);

  // * Store
  router.post("", productConntroller.store);

  // * Update
  router.put("/:product_id", productConntroller.update);

  // * Delete
  router.delete("/:product_id", productConntroller.destroy);
});

module.exports = router;
