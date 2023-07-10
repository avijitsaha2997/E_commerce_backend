const catchBlockErrorHandler = (error, res) => {
  if (error.name === "ValidationError") {
    const validationErrors = Object.values(error.errors).map(
      (err) => err.message
    );
    res.status(400).json({
      success: false,
      message: validationErrors,
    });
    return true;
  }
  return false;
};

module.exports = catchBlockErrorHandler;
