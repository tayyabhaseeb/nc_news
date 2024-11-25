const express = require("express");
const checkApi = require("./controllers/checkController");
const { getAllTopics } = require("./controllers/topicsControllers");
const { customErrorHandler } = require("./errors");
const app = express();

app.use(express.json());

app.get("/api", checkApi);
app.get("/api/topics", getAllTopics);

app.use("*", (req, res) => {
  res.status(404).json({
    msg: "Endpoint not found. Please check the end point url again",
  });
});

app.use(customErrorHandler);

module.exports = app;
