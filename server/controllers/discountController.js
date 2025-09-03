const Discount = require("../models/Discount");
const DiscountUsageLog = require("../models/DiscountUsageLog");
const Product = require("../models/Product");
const User = require("../models/User");
const mongoose = require("mongoose");

// Helper: Validate discount input
function validateDiscountInput(body) {
  const errors = [];
  if (!body.code) errors.push("Discount code is required");
  if (!body.type || !["flat", "percentage", "free_shipping"].includes(body.type)) errors.push("Invalid discount type");
  if (["flat", "percentage"].includes(body.type) && (body.value === undefined || body.value === null)) errors.push("Discount value is required");
  if (!body.startDate) errors.push("Start date is required");
  if (!body.endDate) errors.push("End date is required");
  if (body.type === "percentage" && body.maxDiscountCap !== undefined && body.maxDiscountCap < 0) errors.push("Max discount cap must be positive");
  if (body.usageLimit !== undefined && body.usageLimit < 0) errors.push("Usage limit must be positive");
  if (body.usagePerUser !== undefined && body.usagePerUser < 0) errors.push("Usage per user must be positive");
  return errors;
}

// Create a new discount
const createDiscount = async (req, res) => {
  try {
    const errors = validateDiscountInput(req.body);
    if (errors.length) return res.status(400).json({ success: false, errors });
    const exists = await Discount.findOne({ code: req.body.code });
    if (exists) return res.status(400).json({ success: false, message: "Discount code already exists" });
    const discount = new Discount(req.body);
    await discount.save();
    res.status(201).json({ success: true, message: "Discount created", data: discount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all discounts
const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find().sort({ createdAt: -1 });
    res.json({ success: true, data: discounts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get discount by ID
const getDiscountById = async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id);
    if (!discount) return res.status(404).json({ success: false, message: "Discount not found" });
    res.json({ success: true, data: discount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update discount
const updateDiscount = async (req, res) => {
  try {
    const errors = validateDiscountInput({ ...req.body, code: "dummy", type: req.body.type || "flat" }); // code not required for update
    if (errors.length) return res.status(400).json({ success: false, errors });
    const discount = await Discount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!discount) return res.status(404).json({ success: false, message: "Discount not found" });
    res.json({ success: true, message: "Discount updated", data: discount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete discount
const deleteDiscount = async (req, res) => {
  try {
    const discount = await Discount.findByIdAndDelete(req.params.id);
    if (!discount) return res.status(404).json({ success: false, message: "Discount not found" });
    res.json({ success: true, message: "Discount deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Apply discount code to a cart
const applyDiscount = async (req, res) => {
  try {
    const { code, userId, cartValue, cartItems, orderId, mockMode } = req.body;
    if (!code || !userId || !cartValue) {
      return res.status(400).json({ success: false, message: "code, userId, and cartValue are required" });
    }
    
    const discount = await Discount.findOne({ code });
    if (!discount || discount.status !== "active") {
      return res.status(400).json({ success: false, message: "Discount code is invalid or inactive" });
    }
    
    const now = new Date();
    if (now < new Date(discount.startDate) || now > new Date(discount.endDate)) {
      return res.status(400).json({ success: false, message: "Discount code is not valid at this time" });
    }
    
    if (discount.minOrderValue && cartValue < discount.minOrderValue) {
      return res.status(400).json({ success: false, message: `Minimum order value is ₹${discount.minOrderValue}` });
    }
    
    // Usage limits - only check if not in mock mode
    if (!mockMode) {
      const totalUsage = await DiscountUsageLog.countDocuments({ discountCode: code });
      if (discount.usageLimit && totalUsage >= discount.usageLimit) {
        return res.status(400).json({ success: false, message: "Discount usage limit reached" });
      }
      
      const userUsage = await DiscountUsageLog.countDocuments({ discountCode: code, userId });
      if (discount.usagePerUser && userUsage >= discount.usagePerUser) {
        return res.status(400).json({ success: false, message: "You have used this code the maximum allowed times" });
      }
    }
    
    // Eligible users - only check if not in mock mode and if eligibleUsers array exists
    if (!mockMode && discount.eligibleUsers && discount.eligibleUsers.length > 0) {
      const eligible = discount.eligibleUsers.some(
        (id) => id.equals ? id.equals(userId) : id === userId
      );
      if (!eligible) {
        return res.status(400).json({ success: false, message: "You are not eligible for this discount" });
      }
    }
    
    // Applicable products/categories
    let applicable = true;
    if (discount.applicableProducts && discount.applicableProducts.length > 0) {
      applicable = cartItems && cartItems.some(item => 
        discount.applicableProducts.some(pid => 
          pid.equals ? pid.equals(item.productId) : pid === item.productId
        )
      );
      if (!applicable) {
        return res.status(400).json({ success: false, message: "Discount does not apply to any products in your cart" });
      }
    }
    
    if (discount.applicableCategories && discount.applicableCategories.length > 0) {
      applicable = cartItems && cartItems.some(item => 
        discount.applicableCategories.includes(item.category)
      );
      if (!applicable) {
        return res.status(400).json({ success: false, message: "Discount does not apply to any categories in your cart" });
      }
    }
    
    // Calculate discount
    let discountAmount = 0;
    if (discount.type === "flat") {
      discountAmount = discount.value;
    } else if (discount.type === "percentage") {
      discountAmount = (cartValue * discount.value) / 100;
      if (discount.maxDiscountCap && discountAmount > discount.maxDiscountCap) {
        discountAmount = discount.maxDiscountCap;
      }
    } else if (discount.type === "free_shipping") {
      discountAmount = 0; // You may want to handle shipping logic on frontend
    }
    
    if (discountAmount > cartValue) discountAmount = cartValue;
    
    // Log usage only if not in mock mode and orderId is provided
    if (!mockMode && orderId) {
      await DiscountUsageLog.create({
        userId,
        discountCode: code,
        orderId,
        usedAt: new Date(),
        discountAmount,
      });
    }
    
    // Add mock mode indicator in response
    const response = { 
      success: true, 
      discountAmount, 
      message: "Discount applied", 
      type: discount.type 
    };
    
    if (mockMode) {
      response.mockMode = true;
      response.note = "This was a test run - no usage was logged";
    }
    
    res.json(response);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount,
  applyDiscount,
}; 