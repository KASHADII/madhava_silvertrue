const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const discountController = require("../controllers/discountController");

// Public routes (no authentication required)
router.get("/available", discountController.getAvailableDiscounts);
router.post("/apply", discountController.applyDiscount);

// Admin routes (protected)
router.post("/", verifyToken, discountController.createDiscount);
router.get("/", verifyToken, discountController.getAllDiscounts);
router.get("/:id", verifyToken, discountController.getDiscountById);
router.patch("/:id", verifyToken, discountController.updateDiscount);
router.delete("/:id", verifyToken, discountController.deleteDiscount);

module.exports = router; 