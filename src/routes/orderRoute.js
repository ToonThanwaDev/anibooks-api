const express = require("express");

const orderController = require("../controllers/orderController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/order", authenticate, orderController.getOrder);

module.exports = router;
