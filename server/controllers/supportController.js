const CustomerSupport = require("../models/CustomerSupport");
const User = require("../models/User");

// Create a new support message
const createSupportMessage = async (req, res) => {
  try {
    const { subject, message } = req.body;
    const userId = req.id;

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const supportMessage = new CustomerSupport({
      user: userId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      subject,
      message,
    });

    await supportMessage.save();

    return res.status(201).json({
      success: true,
      message: "Support message submitted successfully",
      data: supportMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all support messages (admin only)
const getAllSupportMessages = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }

    const supportMessages = await CustomerSupport.find(query)
      .populate("user", "name email phone")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await CustomerSupport.countDocuments(query);

    return res.status(200).json({
      success: true,
      data: supportMessages,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get support message by ID
const getSupportMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    const supportMessage = await CustomerSupport.findById(id).populate(
      "user",
      "name email phone"
    );

    if (!supportMessage) {
      return res.status(404).json({
        success: false,
        message: "Support message not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: supportMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update support message status (admin only)
const updateSupportMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminResponse } = req.body;

    const supportMessage = await CustomerSupport.findById(id);

    if (!supportMessage) {
      return res.status(404).json({
        success: false,
        message: "Support message not found",
      });
    }

    supportMessage.status = status;
    if (adminResponse) {
      supportMessage.adminResponse = adminResponse;
    }
    if (status === "resolved") {
      supportMessage.resolvedAt = new Date();
    }

    await supportMessage.save();

    return res.status(200).json({
      success: true,
      message: "Support message updated successfully",
      data: supportMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete support message (admin only)
const deleteSupportMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const supportMessage = await CustomerSupport.findByIdAndDelete(id);

    if (!supportMessage) {
      return res.status(404).json({
        success: false,
        message: "Support message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Support message deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSupportMessage,
  getAllSupportMessages,
  getSupportMessageById,
  updateSupportMessageStatus,
  deleteSupportMessage,
};

