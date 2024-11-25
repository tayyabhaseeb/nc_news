const { fetchAllArticles } = require("../models/articlesModels");

const getAllArticles = (req, res, next) => {
  fetchAllArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

const getSpecificArticle = (req, res, next) => {
  res.status(200).send({ msg: "Hi" });
};

module.exports = { getAllArticles };
