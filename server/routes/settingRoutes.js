const router = require("express").Router();
const {
  changeUsername,
  changePassword,
} = require("../controllers/settingController");
const verifyToken = require("../middlewares/verifyToken");
const { settingsLimiter } = require("../middlewares/rateLimiter");

router.put("/change-username", verifyToken, settingsLimiter, changeUsername);
router.put("/change-password", verifyToken, settingsLimiter, changePassword);

module.exports = router;
