const {
  fetchAllArticles,
  fetchBySpecificId,
  fetchCommentsByArticle,
  postCommentsByArticle,
  fetchPatchedArticle,
  fetchDeletedArticle,
  updatedArticles,
} = require("../models/articlesModels");

const getAllArticles = (req, res, next) => {
  const { sort_by, order, topic, limit = 10, page } = req.query;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  fetchAllArticles(sort_by, order, topic)
    .then((articles) => {
      const paginatedArticles = articles.slice(startIndex, endIndex);
      return res.status(200).send({
        total_count: limit && page ? paginatedArticles.length : articles.length,
        articles: limit && page ? paginatedArticles : articles,
      });
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
  const { limit = 10, page } = req.query;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  fetchCommentsByArticle(article_id)
    .then((comments) => {
      const paginatedComments = comments.slice(startIndex, endIndex);
      return res.status(200).send({
        total_count: limit && page ? paginatedComments.length : comments.length,
        comments: limit && page ? paginatedComments : comments,
      });
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
  const { inc_votes } = req.body;
  const { article_id } = req.params;
  fetchPatchedArticle(article_id, inc_votes).then((article) => {
    res.status(200).send({ article });
  });
};

const deleteArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchDeletedArticle(article_id).then(() => {
    res.status(204).send();
  });
};

const addNewArticles = (req, res) => {
  const articleBody = req.body;

  updatedArticles(articleBody).then((article) => {
    res.status(201).send(article);
  });
};
module.exports = {
  getAllArticles,
  getSpecificArticle,
  getCommentBySpecId,
  postCommentBySpecId,
  updateArticleById,
  deleteArticleId,
  addNewArticles,
};
