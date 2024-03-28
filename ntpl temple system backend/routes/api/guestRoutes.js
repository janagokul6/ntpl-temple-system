const router = require("express").Router();
const productController = require("../../controller/guest/productsController");
const categoiesController = require("../../controller/guest/categoiesController");

router.get("/products/getAll", productController.get);
router.get("/categories/getAll", categoiesController.get);

module.exports = router;
