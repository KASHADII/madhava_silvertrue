const express = require("express");
const router = express.Router();

router.use("/discounts", require("./discountRoutes"));
router.use("/products", require("./productRoutes"));
router.use("/categories", require("./categoryRoutes"));
router.use("/pincodes", require("./pincodeRoutes"));
router.use("/settings", require("./settingRoutes"));
router.use("/orders", require("./OrderRoutes"));
router.use("/payments", require("./paymentRoutes"));
router.use("/reviews", require("./ReviewRoutes"));
router.use("/support", require("./supportRoutes"));
router.use("/auth", require("./authRoutes"));

module.exports = router; 