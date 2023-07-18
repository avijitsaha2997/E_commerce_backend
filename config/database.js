const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
    })
    .then(() => console.log("Connected to MongoDB"));
};

module.exports = connectDatabase;
