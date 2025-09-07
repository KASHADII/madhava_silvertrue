const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
    type: { type: String, enum: ["flat", "percentage", "free_shipping"], required: true },
    value: { type: Number }, // required if flat or percentage
    description: { type: String, required: true, trim: true }, // User-friendly description
    minOrderValue: { type: Number },
    maxDiscountCap: { type: Number }, // only for percentage
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    usageLimit: { type: Number }, // total usage across all users
    usagePerUser: { type: Number },
    applicableProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    applicableCategories: [{ type: String }],
    eligibleUsers: [{ type: mongoose.Schema.Types.Mixed }], // can be ObjectIds or email strings
  },
  { timestamps: true }
);

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount; 