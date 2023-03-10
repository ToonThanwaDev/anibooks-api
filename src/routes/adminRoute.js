const express = require("express");

const adminController = require("../controllers/adminController");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/add", authenticate, upload.single("image"), adminController.addProduct);
router.patch("/edit/:productId", authenticate, upload.single("image"), adminController.editProduct);
router.delete("/:productId", authenticate, adminController.deleteProduct);

module.exports = router;
