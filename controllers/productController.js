const Product = require("../models/productModel.js");

// Create product -- Admin
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      product: products,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to find all products." });
  }
};

const getProductsDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to find product details." });
  }
};

// Update product -- Admin
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;
    let product = await Product.findById(productId);

    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }

    product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to find all products." });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete products." });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsDetails,
};
