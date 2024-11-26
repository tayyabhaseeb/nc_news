const {
  fetchAllArticles,
  fetchBySpecificId,
  fetchCommentsByArticle,
  postCommentsByArticle,
  fetchPatchedArticle,
  fetchDeletedArticle,
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

const getCommentBySpecId = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsByArticle(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

const postCommentBySpecId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  postCommentsByArticle(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

const updateArticleById = (req, res, next) => {
  const { title } = req.body;
  const { article_id } = req.params;
  fetchPatchedArticle(article_id, title).then((article) => {
    res.status(200).send({ article });
  });
};

const deleteArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchDeletedArticle(article_id).then(() => {
    res.status(204).send();
  });
};
module.exports = {
  getAllArticles,
  getSpecificArticle,
  getCommentBySpecId,
  postCommentBySpecId,
  updateArticleById,
  deleteArticleId,
};
