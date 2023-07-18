const ErrorHandler = require("../utils/errorHandler.js");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Intenal server error";

  // wrong MongoDB ID error
  if (err.name === "CastError") {
    const errMsg = `Resource not found. Invlid: ${err.path}`;
    err = new ErrorHandler(errMsg, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
