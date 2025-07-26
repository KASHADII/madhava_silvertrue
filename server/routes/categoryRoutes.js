const router = require("express").Router();
const {
  createCategory,
  getAllCategories,
  getAllCategoriesAdmin,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const verifyToken = require("../middlewares/verifyToken");

// Public route - get active categories
router.get("/get-categories", getAllCategories);

// Admin routes
router.get("/get-categories-admin", verifyToken, getAllCategoriesAdmin);
router.post("/create-category", verifyToken, createCategory);
router.put("/update-category/:id", verifyToken, updateCategory);
router.delete("/delete-category/:id", verifyToken, deleteCategory);

module.exports = router; 