const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const discountController = require("../controllers/discountController");

// Admin routes (protected)
router.post("/", verifyToken, discountController.createDiscount);
router.get("/", verifyToken, discountController.getAllDiscounts);
router.get("/:id", verifyToken, discountController.getDiscountById);
router.patch("/:id", verifyToken, discountController.updateDiscount);
router.delete("/:id", verifyToken, discountController.deleteDiscount);

// Public route to apply discount
router.post("/apply", discountController.applyDiscount);

module.exports = router; 