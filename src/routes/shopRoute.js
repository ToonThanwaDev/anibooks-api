const express = require("express");

const productController = require("../controllers/productController");

const router = express.Router();

router.get("/shop", productController.getAllProduct);

module.exports = router;
