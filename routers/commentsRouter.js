const {
  deleteCommentById,
  updateComment,
} = require("../controllers/commentsController");

const commentsRouter = require("express").Router();

commentsRouter
  .route("/:comment_id")
  .delete(deleteCommentById)
  .patch(updateComment);

module.exports = commentsRouter;
