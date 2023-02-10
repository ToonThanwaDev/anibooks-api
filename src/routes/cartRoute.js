const express = require("express");

const cartController = require("../controllers/cartController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/cart", authenticate, cartController.getCart);

module.exports = router;
