const router = require("express").Router();
const {
  generatePayment,
  verifyPayment,
} = require("../controllers/paymentController");
const verifyToken = require("../middlewares/verifyToken");
const { paymentLimiter } = require("../middlewares/rateLimiter");

router.post("/generate-payment", verifyToken, paymentLimiter, generatePayment);
router.post("/verify-payment", verifyToken, paymentLimiter, verifyPayment);
module.exports = router;
