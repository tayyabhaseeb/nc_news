const db = require("../db/connection");
const fetchDeletedComment = (id) => {
  return db
    .query(`DELETE FROM comments where comment_id = $1`, [id])
    .then(({ rows }) => {
      return rows[0];
    });
};

const fetchUpdatedComment = (id, updatedVotes) => {
  return db
    .query(
      `UPDATE comments SET votes = votes + $1  WHERE comment_id = $2  RETURNING *`,
      [updatedVotes, id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

module.exports = { fetchDeletedComment, fetchUpdatedComment };
