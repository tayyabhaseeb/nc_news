const db = require("../db/connection");

const fetchAllArticles = (sort_by = "created_at", order = "desc", topic) => {
  const validSortValues = [
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
    "article_img_url",
  ];
  const validOrderValues = ["desc", "asc"];
  const validTopics = ["coding", "football", "cooking", "cats"];

  const queryValues = [];

  if (!validSortValues.includes(sort_by)) {
    return Promise.reject({ status: 404, msg: "Invalid Sorted Values" });
  }

  if (!validOrderValues.includes(order)) {
    return Promise.reject({ status: 404, msg: "Invalid Order" });
  }
  if (topic && !validTopics.includes(topic)) {
    return Promise.reject({ status: 404, msg: "Invalid topic" });
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
      `;

  if (topic) {
    dbQuery += ` WHERE topic = $1`;
    queryValues.push(topic);
  }

  dbQuery += `
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

  return db.query(dbQuery, queryValues).then(({ rows }) => {
    return rows;
  });
};

const fetchBySpecificId = (id) => {
  let dbQuery = `SELECT 
       articles.author,
       articles.title, 
       articles.article_id, 
       articles.body,     
       articles.topic, 
       articles.created_at, 
       articles.votes, 
       articles.article_img_url,
       COUNT(comments.comment_id)AS comment_count
       FROM articles
       LEFT JOIN comments 
       ON articles.article_id = comments.article_id
       WHERE articles.article_id = $1
       GROUP BY 
       articles.author,
       articles.title, 
       articles.article_id, 
       articles.body,
       articles.topic, 
       articles.created_at, 
       articles.votes, 
       articles.article_img_url
      `;

  return db.query(dbQuery, [id]).then(({ rows }) => {
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

const updatedArticles = (articleBody) => {
  const { author, title, body, topic } = articleBody;

  return db
    .query(
      `INSERT INTO articles (author, title, body, topic)
      VALUES($1, $2, $3, $4)
      RETURNING *;`,
      [author, title, body, topic]
    )
    .then(({ rows }) => {
      // Assuming comment_count is not part of the database table and is manually added
      return { ...rows[0], comment_count: 0 };
    });
};

module.exports = {
  fetchAllArticles,
  fetchBySpecificId,
  fetchCommentsByArticle,
  postCommentsByArticle,
  fetchPatchedArticle,
  fetchDeletedArticle,
  updatedArticles,
};
