const { fetchUsers, fetchSpecificUser } = require("../models/usersModels");

const getAllUsers = (req, res) => {
  fetchUsers().then((users) => {
    res.status(200).send({ users });
  });
};

const getSpecificUser = (req, res) => {
  const { username } = req.params;
  fetchSpecificUser(username).then((user) => {
    res.status(200).send({ user });
  });
};

module.exports = { getAllUsers, getSpecificUser };
