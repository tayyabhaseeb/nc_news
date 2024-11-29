const db = require("../db/connection");

const fetchTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
};

const fetchNewAddedTopic = (body) => {
  const { slug, description } = body;
  return db
    .query(
      `
  INSERT INTO topics(slug , description)
  VALUES($1, $2)
  RETURNING *
  
  `,
      [slug, description]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

module.exports = { fetchTopics, fetchNewAddedTopic };
