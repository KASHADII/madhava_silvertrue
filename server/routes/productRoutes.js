const router = require("express").Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductByName,
  blacklistProduct,
  removeFromBlacklist,
} = require("../controllers/productController");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../middlewares/multer");
const { 
  productCreationLimiter, 
  searchLimiter, 
  uploadLimiter 
} = require("../middlewares/rateLimiter");

router.post(
  "/create-product",
  verifyToken,
  uploadLimiter,
  upload.array("images", 4),
  productCreationLimiter,
  createProduct
);

router.put("/update-product/:id", verifyToken, updateProduct);

router.delete("/delete-product/:id", verifyToken, deleteProduct);

router.get("/get-products", searchLimiter, getProducts);

router.get("/get-product-by-name/:name", searchLimiter, getProductByName);

router.put("/blacklist-product/:id", verifyToken, blacklistProduct);

router.put("/remove-from-blacklist/:id", verifyToken, removeFromBlacklist);

module.exports = router;
