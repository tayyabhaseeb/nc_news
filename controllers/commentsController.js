const {
  fetchDeletedComment,
  fetchUpdatedComment,
} = require("../models/commentsModel");

const deleteCommentById = (req, res) => {
  const { comment_id } = req.params;

  fetchDeletedComment(comment_id).then((comment) => {
    res.status(204).send({ comment });
  });
};

const updateComment = (req, res) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  fetchUpdatedComment(comment_id, inc_votes).then((comment) => {
    res.status(200).send({ comment });
  });
};

module.exports = { deleteCommentById, updateComment };
