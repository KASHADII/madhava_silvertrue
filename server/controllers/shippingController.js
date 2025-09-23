const Order = require("../models/Order");
const shiprocketService = require("../services/shiprocketService");
const { ROLES } = require("../utils/constants");

// Track shipment by AWB code
const trackShipment = async (req, res) => {
  try {
    const { awbCode } = req.params;

    if (!awbCode) {
      return res.status(400).json({
        success: false,
        message: "AWB code is required",
      });
    }

    const trackingResult = await shiprocketService.trackShipment(awbCode);

    if (trackingResult.success) {
      return res.status(200).json({
        success: true,
        data: trackingResult.trackingData,
        message: "Tracking data retrieved successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: trackingResult.error || "Failed to track shipment",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get shipment details by order ID
const getShipmentDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('products.id').populate('userId');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.shipping.shipmentId) {
      return res.status(400).json({
        success: false,
        message: "No shipment found for this order",
      });
    }

    const shipmentResult = await shiprocketService.getShipmentDetails(order.shipping.shipmentId);

    if (shipmentResult.success) {
      return res.status(200).json({
        success: true,
        data: {
          order: order,
          shipment: shipmentResult.shipmentData,
        },
        message: "Shipment details retrieved successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: shipmentResult.error || "Failed to get shipment details",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update shipping status (Admin only)
const updateShippingStatus = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to access this resource",
    });
  }

  try {
    const { orderId } = req.params;
    const { shippingStatus, estimatedDelivery } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const updateData = {};
    if (shippingStatus) {
      updateData["shipping.shippingStatus"] = shippingStatus;
    }
    if (estimatedDelivery) {
      updateData["shipping.estimatedDelivery"] = new Date(estimatedDelivery);
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true }
    ).populate('products.id').populate('userId');

    return res.status(200).json({
      success: true,
      data: updatedOrder,
      message: "Shipping status updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Generate AWB for existing order (Admin only)
const generateAWB = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to access this resource",
    });
  }

  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.shipping.shipmentId) {
      return res.status(400).json({
        success: false,
        message: "No shipment found for this order. Please create shipment first.",
      });
    }

    const awbResult = await shiprocketService.generateAWB(order.shipping.shipmentId);

    if (awbResult.success) {
      // Update order with AWB details
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          "shipping.awbCode": awbResult.awbCode,
          "shipping.courierName": awbResult.courierName,
          "shipping.trackingUrl": `https://shiprocket.co/tracking/${awbResult.awbCode}`,
        },
        { new: true }
      ).populate('products.id').populate('userId');

      return res.status(200).json({
        success: true,
        data: updatedOrder,
        message: "AWB generated successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: awbResult.error || "Failed to generate AWB",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Cancel shipment (Admin only)
const cancelShipment = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to access this resource",
    });
  }

  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.shipping.shipmentId) {
      return res.status(400).json({
        success: false,
        message: "No shipment found for this order",
      });
    }

    const cancelResult = await shiprocketService.cancelShipment(order.shipping.shipmentId);

    if (cancelResult.success) {
      // Update order status
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          "shipping.shippingStatus": "failed",
          status: "failed",
        },
        { new: true }
      ).populate('products.id').populate('userId');

      return res.status(200).json({
        success: true,
        data: updatedOrder,
        message: "Shipment cancelled successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: cancelResult.error || "Failed to cancel shipment",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get available couriers for a pincode
const getAvailableCouriers = async (req, res) => {
  try {
    const { pincode } = req.params;

    if (!pincode) {
      return res.status(400).json({
        success: false,
        message: "Pincode is required",
      });
    }

    const couriersResult = await shiprocketService.getAvailableCouriers(pincode);

    if (couriersResult.success) {
      return res.status(200).json({
        success: true,
        data: couriersResult.couriers,
        message: "Available couriers retrieved successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: couriersResult.error || "Failed to get available couriers",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all orders with shipping details (Admin only)
const getAllOrdersWithShipping = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to access this resource",
    });
  }

  try {
    const orders = await Order.find({})
      .populate('products.id')
      .populate('userId')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: orders,
      message: "Orders with shipping details retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  trackShipment,
  getShipmentDetails,
  updateShippingStatus,
  generateAWB,
  cancelShipment,
  getAvailableCouriers,
  getAllOrdersWithShipping,
};
