const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  trackShipment,
  getShipmentDetails,
  updateShippingStatus,
  generateAWB,
  cancelShipment,
  getAvailableCouriers,
  getAllOrdersWithShipping,
} = require("../controllers/shippingController");

// Public routes
router.get("/track/:awbCode", trackShipment);
router.get("/couriers/:pincode", getAvailableCouriers);

// Protected routes (require authentication)
router.get("/order/:orderId", verifyToken, getShipmentDetails);

// Admin only routes
router.get("/admin/orders", verifyToken, getAllOrdersWithShipping);
router.put("/admin/order/:orderId/status", verifyToken, updateShippingStatus);
router.post("/admin/order/:orderId/awb", verifyToken, generateAWB);
router.post("/admin/order/:orderId/cancel", verifyToken, cancelShipment);

module.exports = router;
