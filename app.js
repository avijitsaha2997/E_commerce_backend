const express = require("express");
const product = require("./routes/productRoute.js");
const user = require("./routes/userRoute.js");
const cookieparser = require("cookie-parser");
const errorMiddleware = require("./middleware/error.js");

const app = express();

app.use(express.json());
app.use(cookieparser());

// app routes
app.use("/api/v1", product);
app.use("/api/v1", user);

// Middleware for error handling
app.use(errorMiddleware);

module.exports = app;
