const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database.js");

// handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server due to uncaught exception...`);

  process.exit(1);
});
// config
dotenv.config({ path: __dirname + "/config/.env" });

// connect database
connectDatabase();

// listen
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});

// undhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server due to unhandled promise rejection...`);

  server.close(() => {
    process.exit(1);
  });
});
