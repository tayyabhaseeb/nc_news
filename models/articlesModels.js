const db = require("../db/connection");

const fetchAllArticles = () => {
  return db.query(`SELECT * FROM articles`).then(({ rows }) => {
    return rows;
  });
};

module.exports = { fetchAllArticles };
