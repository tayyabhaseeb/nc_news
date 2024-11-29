const { fetchTopics, fetchNewAddedTopic } = require("../models/topicsModels");

const getAllTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

const addNewTopic = (req, res, next) => {
  const body = req.body;
  fetchNewAddedTopic(body).then((topic) => {
    res.status(201).send({ topic });
  });
};

module.exports = { getAllTopics, addNewTopic };
