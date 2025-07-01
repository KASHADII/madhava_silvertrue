const {
  signup,
  login,
  adminSignup,
  adminLogin,
} = require("../controllers/authController");
const router = require("express").Router();
const { authLimiter, adminAuthLimiter } = require("../middlewares/rateLimiter");

router.post("/signup", authLimiter, signup);

router.post("/login", authLimiter, login);

router.post("/admin-signup", adminAuthLimiter, adminSignup);

router.post("/admin-login", adminAuthLimiter, adminLogin);

module.exports = router;
