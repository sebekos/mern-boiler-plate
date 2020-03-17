const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const dotenv = require("dotenv");

// Init express
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Setup porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
