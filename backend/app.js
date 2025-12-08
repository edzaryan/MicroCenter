const express = require("express");
const morgan = require("morgan");
const chalk = require("chalk");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const router = require("./routes");

require("dotenv").config();

const app = express();

// Middleware setup
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(chalk.green("Connected to DB"));
        console.log(chalk.blue(`Server is running on port ${PORT}`));
    });
});
