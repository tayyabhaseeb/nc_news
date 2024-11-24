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
      return rows[0];
    });
};

module.exports = { fetchAllArticles, fetchBySpecificId };
