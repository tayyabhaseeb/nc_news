const { deleteCommentById } = require("../controllers/commentsController");

const commentsRouter = require("express").Router();

commentsRouter.route("/:comment_id").delete(deleteCommentById);

module.exports = commentsRouter;
