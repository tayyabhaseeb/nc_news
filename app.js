const express = require("express");
const { customErrorHandler } = require("./errors");
const apiRouter = require("./routers/apiRouter");
const topicsRouter = require("./routers/topicsRouter");
const articlesRouter = require("./routers/articlesRouter");
const commentsRouter = require("./routers/commentsRouter");
const usersRouter = require("./routers/usersRouter");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);
app.use("/api/topics", topicsRouter);

app.use("/api/articles", articlesRouter);

app.use("/api/comments", commentsRouter);

app.use("/api/users", usersRouter);

app.use("*", (req, res) => {
  res.status(404).send({
    msg: "Endpoint not found. Please check the end point url again",
  });
});

app.use(customErrorHandler);

module.exports = app;
