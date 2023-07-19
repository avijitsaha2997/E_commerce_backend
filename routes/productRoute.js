const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsDetails,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

router.get("/products", getAllProducts);
router.post(
  "/product/new",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  createProduct
);
router.put(
  "/product/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  updateProduct
);
router.delete(
  "/product/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  deleteProduct
);
router.get("/product/:id", getProductsDetails);

module.exports = router;
