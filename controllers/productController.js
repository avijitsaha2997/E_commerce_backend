const Product = require("../models/productModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const catchBlockErrorHandler = require("../errorFunc/catchBlockErrorHandler.js");

// Create product -- Admin
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (error) {
    if (!catchBlockErrorHandler(error, res)) {
      res.status(500).json({ error: "Failed to create product" });
    }
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
    if (!catchBlockErrorHandler(error, res)) {
      res.status(500).json({ error: "Failed to find all products." });
    }
  }
};

// Get product details
const getProductsDetails = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found.", 404));
    }

    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (error) {
    if (!catchBlockErrorHandler(error, res)) {
      res.status(500).json({ error: "Failed to find product details." });
    }
  }
};

// Update product -- Admin
const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;
    let product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
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
    if (!catchBlockErrorHandler(error, res)) {
      res.status(500).json({ error: "Failed to update product." });
    }
  }
};

// Delete a product
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    if (!catchBlockErrorHandler(error, res)) {
      res.status(500).json({ error: "Failed to delete products." });
    }
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsDetails,
};
