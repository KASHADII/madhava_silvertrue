const express = require("express");
const router = express.Router();
const {
  createSupportMessage,
  getAllSupportMessages,
  getSupportMessageById,
  updateSupportMessageStatus,
  deleteSupportMessage,
} = require("../controllers/supportController");
const verifyToken = require("../middlewares/verifyToken");

// User routes
router.post("/create", verifyToken, createSupportMessage);

// Admin routes
router.get("/all", verifyToken, getAllSupportMessages);
router.get("/:id", verifyToken, getSupportMessageById);
router.put("/:id/status", verifyToken, updateSupportMessageStatus);
router.delete("/:id", verifyToken, deleteSupportMessage);

module.exports = router;

