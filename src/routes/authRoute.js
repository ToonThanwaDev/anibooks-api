const express = require("express");

const authController = require("../controllers/authController");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticate, authController.getMe);
router.patch("/payment", authenticate, authController.informationUser);
router.post(
  "/payment",
  authenticate,
  upload.single("slipImage"),
  authController.informationUser
);

module.exports = router;
