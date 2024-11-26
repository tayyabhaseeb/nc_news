const db = require("../db/connection");

const fetchAllArticles = () => {
  return db
    .query(
      `SELECT 
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
       ORDER BY articles.created_at DESC;
      `
    )
    .then(({ rows }) => {
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
    .query(
      `
  SELECT comment_id , votes, created_at, author, body, article_id
  FROM comments WHERE article_id = $1
  ORDER BY created_at DESC
  `,
      [id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      } else {
        return rows;
      }
    });
};

module.exports = {
  fetchAllArticles,
  fetchBySpecificId,
  fetchCommentsByArticle,
};
