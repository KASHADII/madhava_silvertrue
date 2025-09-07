const mongoose = require("mongoose");

const customerSupportSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "resolved"],
      default: "pending",
    },
    adminResponse: {
      type: String,
      default: "",
    },
    resolvedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const CustomerSupport = mongoose.model("CustomerSupport", customerSupportSchema);

module.exports = CustomerSupport;
