const express = require("express");
const app = express();
const mongoose = require("mongoose");

const connectionString = process.env.CONNECTION_STRING;
if (app.get("env") !== "test") {
  mongoose
    .connect(connectionString, { connectTimeoutMS: 2000 })
    .then(() => console.log("Database connected"))
    .catch((error) => console.error(error));
}
