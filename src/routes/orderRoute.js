const express = require("express");

const orderController = require("../controllers/orderController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/order", authenticate, orderController.getOrder);
router.get("/admin/process", orderController.getOrderUser);
router.patch("/updateorder", orderController.updateOrder);

module.exports = router;
