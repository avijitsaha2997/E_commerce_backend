const Product = require("../models/productModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsynErrors = require("../middleware/catchAsyncError.js");
const ApiFeaturs = require("../utils/apiFeatures.js");

// Create product -- Admin
const createProduct = catchAsynErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product: product,
  });
});

// Get all products
const getAllProducts = catchAsynErrors(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeaturs(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

// Get product details
const getProductsDetails = catchAsynErrors(async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update product -- Admin
const updateProduct = catchAsynErrors(async (req, res, next) => {
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
});

// Delete a product
const deleteProduct = catchAsynErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsDetails,
};
