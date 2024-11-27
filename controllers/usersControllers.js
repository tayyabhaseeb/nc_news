const { fetchUsers } = require("../models/usersModels");

const getAllUsers = (req, res) => {
  fetchUsers().then((users) => {
    res.status(200).send({ users });
  });
};

module.exports = { getAllUsers };
