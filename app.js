const express = require("express");
const checkApi = require("./controllers/checkController");
const { getAllTopics } = require("./controllers/topicsControllers");
const { customErrorHandler } = require("./errors");
const {
  getAllArticles,
  getSpecificArticle,
} = require("./controllers/articlesController");

const app = express();

app.use(express.json());

app.get("/api", checkApi);
app.get("/api/topics", getAllTopics);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id", getSpecificArticle);
app.use("*", (req, res) => {
  res.status(404).send({
    msg: "Endpoint not found. Please check the end point url again",
  });
});

app.use(customErrorHandler);

module.exports = app;
