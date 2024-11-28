const db = require("../db/connection");

const fetchUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    return rows;
  });
};

const fetchSpecificUser = (userName) => {
  return db
    .query(`SELECT username, avatar_url, name FROM users WHERE username = $1`, [
      userName,
    ])
    .then(({ rows }) => {
      return rows[0];
    });
};

module.exports = { fetchUsers, fetchSpecificUser };
