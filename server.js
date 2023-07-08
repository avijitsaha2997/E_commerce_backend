const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database.js");

// config
dotenv.config({ path: __dirname + "/config/.env" });

// connect database
connectDatabase();

// listen
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${process.env.PORT}`);
});
