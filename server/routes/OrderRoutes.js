const router = require("express").Router();
const {
  getOrdersByUserId,
  getAllOrders,
  getMetrics,
  updateOrderStatus,
} = require("../controllers/OrderController");
const verifyToken = require("../middlewares/verifyToken");
const { orderLimiter, analyticsLimiter } = require("../middlewares/rateLimiter");

router.get("/get-orders-by-user-id", verifyToken, orderLimiter, getOrdersByUserId);

router.get("/get-all-orders", verifyToken, getAllOrders);

router.get("/get-metrics", verifyToken, analyticsLimiter, getMetrics);

router.put("/update-order-status/:paymentId", verifyToken, updateOrderStatus);

module.exports = router;
