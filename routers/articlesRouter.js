const {
  getAllArticles,
  getSpecificArticle,
  getCommentBySpecId,
  postCommentBySpecId,
  updateArticleById,
  deleteArticleId,
} = require("../controllers/articlesController");

const articlesRouter = require("express").Router();

articlesRouter.route("/").get(getAllArticles);

articlesRouter
  .route("/:article_id")
  .get(getSpecificArticle)
  .patch(updateArticleById)
  .delete(deleteArticleId);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentBySpecId)
  .post(postCommentBySpecId);

module.exports = articlesRouter;
