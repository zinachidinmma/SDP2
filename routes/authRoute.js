const router = require("express").Router();
const {
  login,
  register,
  getUserInfo,
} = require("../controller/authController");
const validatingToken = require("../middleware/validatingToken");

router.post("/login", login);
router.post("/register", register);
router.get("/userInfo", validatingToken, getUserInfo);

module.exports = router;
