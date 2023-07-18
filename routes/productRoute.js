const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsDetails,
} = require("../controllers/productController");
const isAuthenticatedUser = require("../middleware/auth");

const router = express.Router();

router.get("/products", isAuthenticatedUser, getAllProducts);
router.post("/product/new", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);
router.get("/product/:id", getProductsDetails);

module.exports = router;
