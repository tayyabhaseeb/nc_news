const db = require("../db/connection");
const fetchDeletedComment = (id) => {
  return db
    .query(`DELETE FROM comments where comment_id = $1`, [id])
    .then(({ rows }) => {
      return rows[0];
    });
};

module.exports = { fetchDeletedComment };
