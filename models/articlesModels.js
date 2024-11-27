const db = require("../db/connection");

const fetchAllArticles = (sort_by = "created_at", order = "desc") => {
  const validSortValues = [
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
    "article_img_url",
  ];
  const validOrderValues = ["desc", "asc"];

  if (!validSortValues.includes(sort_by)) {
    return Promise.reject({ status: 404, msg: "Invalid Sorted Values" });
  }

  if (!validOrderValues.includes(order)) {
    return Promise.reject({ status: 404, msg: "Invalid Order" });
  }

  let dbQuery = `SELECT 
         articles.article_id, 
         articles.title, 
         articles.topic, 
         articles.author, 
         articles.created_at, 
         articles.votes, 
         articles.article_img_url,
         COUNT(comments.comment_id)AS comment_count
       FROM articles
       LEFT JOIN comments 
       ON articles.article_id = comments.article_id
       GROUP BY 
         articles.article_id, 
         articles.title, 
         articles.topic, 
         articles.author, 
         articles.created_at, 
         articles.votes, 
         articles.article_img_url
      
      `;

  if (sort_by) {
    dbQuery += ` ORDER BY articles.${sort_by} `;
  }

  if (order) {
    dbQuery += `${order}`;
  }

  return db.query(dbQuery).then(({ rows }) => {
    return rows;
  });
};

const fetchBySpecificId = (id) => {
  return db
    .query(
      `SELECT author , title, article_id, body, topic, created_at, votes, article_img_url FROM articles WHERE article_id = $1`,
      [id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      } else {
        return rows[0];
      }
    });
};

const fetchCommentsByArticle = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }

      return db
        .query(
          `
          SELECT comment_id, votes, created_at, author, body, article_id
          FROM comments 
          WHERE article_id = $1
          ORDER BY created_at DESC;
          `,
          [id]
        )
        .then(({ rows }) => {
          return rows;
        });
    });
};

const postCommentsByArticle = (id, username, body) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return db
        .query(
          `INSERT INTO comments (article_id , author, body)
      VALUES($1, $2, $3)
      RETURNING *
      `,
          [id, username, body]
        )
        .then(({ rows }) => {
          return rows[0];
        });
    });
};

const fetchPatchedArticle = (id, inc_votes) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2
      RETURNING *
  `,
      [inc_votes, id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

const fetchDeletedArticle = (id) => {
  return db
    .query(`DELETE FROM comments WHERE article_id = $1`, [id])
    .then(() => {
      return db.query(
        `DELETE FROM articles WHERE article_id = $1 
         RETURNING *`,
        [id]
      );
    });
};

module.exports = {
  fetchAllArticles,
  fetchBySpecificId,
  fetchCommentsByArticle,
  postCommentsByArticle,
  fetchPatchedArticle,
  fetchDeletedArticle,
};
