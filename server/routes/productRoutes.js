const router = require("express").Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductByName,
  blacklistProduct,
  removeFromBlacklist,
  toggleBestSeller,
  getBestSellers,
} = require("../controllers/productController");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../middlewares/multer");

router.post(
  "/create-product",
  verifyToken,
  upload.array("images", 10),
  createProduct
);

router.put("/update-product/:id", verifyToken, upload.array("newImages", 10), updateProduct);

router.delete("/delete-product/:id", verifyToken, deleteProduct);

router.get("/get-products", getProducts);

router.get("/get-product-by-name/:name", getProductByName);

router.put("/blacklist-product/:id", verifyToken, blacklistProduct);

router.put("/remove-from-blacklist/:id", verifyToken, removeFromBlacklist);

router.put("/toggle-best-seller/:id", verifyToken, toggleBestSeller);

router.get("/get-best-sellers", getBestSellers);

module.exports = router;
