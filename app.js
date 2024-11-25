const express = require("express");
const checkApi = require("./controllers/checkController");
const app = express();

app.use(express.json());

app.get("/api", checkApi);

module.exports = app;
