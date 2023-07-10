const express = require("express");
const product = require("./routes/productRoute.js");
const errorMiddleware = require("./middleware/error.js");

const app = express();

app.use(express.json());

app.use("/api/v1", product);

// Middleware for error handling
app.use(errorMiddleware);

module.exports = app;
