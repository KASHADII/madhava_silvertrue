const mongoose = require("mongoose");

const discountUsageLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    discountCode: { type: String, required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    usedAt: { type: Date, default: Date.now },
    discountAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const DiscountUsageLog = mongoose.model("DiscountUsageLog", discountUsageLogSchema);

module.exports = DiscountUsageLog; 