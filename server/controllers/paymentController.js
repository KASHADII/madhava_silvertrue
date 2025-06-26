const Razorpay = require("razorpay");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const crypto = require("crypto");

let instance = null;
let validatePaymentVerification = () => false;

// Initialize Razorpay conditionally
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  // Only require this if Razorpay is set up
  validatePaymentVerification =
    require("razorpay/dist/utils/razorpay-utils").validatePaymentVerification;
} else {
  console.warn("⚠️ Razorpay is disabled: Missing key_id or key_secret in .env");
}

// ----------------- Generate Payment ------------------
const generatePayment = async (req, res) => {
  if (!instance) {
    return res
      .status(503)
      .json({ success: false, message: "Payment service is currently disabled." });
  }

  const userId = req.id;

  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // INR in paisa
      currency: "INR",
      receipt: Math.random().toString(36).substring(2),
    };

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    instance.orders.create(options, async (err, order) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err });
      }

      return res.status(200).json({
        success: true,
        data: {
          ...order,
          name: user.name,
        },
      });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ----------------- Verify Payment ------------------
const verifyPayment = async (req, res) => {
  if (!instance) {
    return res
      .status(503)
      .json({ success: false, message: "Payment service is currently disabled." });
  }

  const userId = req.id;

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      amount,
      productArray,
      address,
    } = req.body;

    const signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const validatedPayment = validatePaymentVerification(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      signature,
      process.env.RAZORPAY_KEY_SECRET
    );

    if (!validatedPayment) {
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }

    // Update user and product info
    for (const product of productArray) {
      await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { purchasedProducts: product.id } }
      );

      await Product.findByIdAndUpdate(
        { _id: product.id },
        { $inc: { stock: -product.quantity } }
      );
    }

    await Order.create({
      amount: amount / 100,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: signature,
      products: productArray,
      address: address,
      userId: userId,
    });

    return res.status(200).json({ success: true, message: "Payment Verified" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { generatePayment, verifyPayment };
