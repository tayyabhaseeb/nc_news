const {
  fetchAllArticles,
  fetchBySpecificId,
} = require("../models/articlesModels");

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
  const { article_id } = req.params;
  fetchBySpecificId(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getAllArticles, getSpecificArticle };
