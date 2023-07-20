const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPasword,
  resetPassword,
} = require("../controllers/userController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/password/forgot", forgotPasword);
router.put("/password/reset/:token", resetPassword);
router.get("/logout", logout);

module.exports = router;
