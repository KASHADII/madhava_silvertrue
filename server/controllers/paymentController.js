const Razorpay = require("razorpay");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const crypto = require("crypto");
const shiprocketService = require("../services/shiprocketService");

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
      shippingAddress,
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

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
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

    // Create order first
    const order = await Order.create({
      amount: amount / 100,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: signature,
      products: productArray,
      address: address,
      userId: userId,
      shipping: {
        shippingAddress: shippingAddress || {
          name: user.name,
          phone: user.phone || "0000000000",
          email: user.email,
          address: address,
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
          country: "India",
        },
      },
    });

    // Create shipment with Shiprocket (async, don't block response)
    try {
      const shipmentData = {
        orderId: order._id.toString(),
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone || "0000000000",
        billingAddress: address,
        billingCity: "Mumbai",
        billingState: "Maharashtra",
        billingPincode: "400001",
        subTotal: amount / 100,
        items: productArray.map(item => ({
          id: item.id,
          name: `Product ${item.id}`, // You might want to fetch actual product name
          quantity: item.quantity,
          price: 0, // You might want to fetch actual price
        })),
      };

      const shipmentResult = await shiprocketService.createShipment(shipmentData);
      
      if (shipmentResult.success) {
        // Update order with shipment details
        await Order.findByIdAndUpdate(order._id, {
          "shipping.shipmentId": shipmentResult.shipmentId,
          "shipping.awbCode": shipmentResult.awbCode,
          "shipping.courierName": shipmentResult.courierName,
          "shipping.trackingUrl": `https://shiprocket.co/tracking/${shipmentResult.awbCode}`,
        });

        console.log(`✅ Shipment created successfully for order ${order._id}: ${shipmentResult.awbCode}`);
      } else {
        console.error(`❌ Failed to create shipment for order ${order._id}:`, shipmentResult.error);
      }
    } catch (shipmentError) {
      console.error(`❌ Shiprocket error for order ${order._id}:`, shipmentError.message);
      // Don't fail the order creation if shipment fails
    }

    return res.status(200).json({ 
      success: true, 
      message: "Payment Verified",
      orderId: order._id,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { generatePayment, verifyPayment };
