const { fetchDeletedComment } = require("../models/commentsModel");

const deleteCommentById = (req, res) => {
  const { comment_id } = req.params;

  fetchDeletedComment(comment_id).then((comment) => {
    res.status(204).send(comment);
  });
};

module.exports = { deleteCommentById };
