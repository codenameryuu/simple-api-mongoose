require("./config/database");

const express = require("express");
const router = express.Router();

const UserController = require("./controllers/user/user_controller");
const userController = new UserController();

router.get("/user", userController.index);
router.post("/user", userController.store);

module.exports = router;
