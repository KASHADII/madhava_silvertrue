const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
      required: true,
    },
    razorpaySignature: {
      type: String,
      required: true,
    },
    products: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "packed", "in transit", "completed", "failed"],
      default: "pending",
    },
    // Shipping details
    shipping: {
      shipmentId: {
        type: String,
        default: null,
      },
      awbCode: {
        type: String,
        default: null,
      },
      courierName: {
        type: String,
        default: null,
      },
      trackingUrl: {
        type: String,
        default: null,
      },
      estimatedDelivery: {
        type: Date,
        default: null,
      },
      shippingStatus: {
        type: String,
        enum: ["pending", "picked_up", "in_transit", "out_for_delivery", "delivered", "failed"],
        default: "pending",
      },
      shippingAddress: {
        name: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        pincode: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          default: "India",
        },
      },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
