const express = require("express");

const cartController = require("../controllers/cartController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/cart", authenticate, cartController.getCart);
router.post("/createcart", authenticate, cartController.createCart);
router.patch("/increase", authenticate, cartController.increase);
router.patch("/decrease", authenticate, cartController.decrease);
router.delete("/:productId", authenticate, cartController.deleteProductCart);

module.exports = router;
