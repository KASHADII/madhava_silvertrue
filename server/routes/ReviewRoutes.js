const {
  createReview,
  updateReview,
  deleteReview,
  getReviews,
  replyReview,
} = require("../controllers/ReviewController");
const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();
const { reviewLimiter } = require("../middlewares/rateLimiter");

router.post("/create-review", verifyToken, reviewLimiter, createReview);

router.put("/update-review/:id", verifyToken, reviewLimiter, updateReview);

router.delete("/delete-review/:id", verifyToken, deleteReview);

router.get("/get-reviews/:id", getReviews);

router.put("/reply-review/:id", verifyToken, reviewLimiter, replyReview);

module.exports = router;
