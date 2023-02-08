const express = require("express");

const productController = require("../controllers/productController");

const router = express.Router();

router.get("/shop", productController.getAllProduct);
router.get("/detail/:productId", productController.productDetail);

module.exports = router;
