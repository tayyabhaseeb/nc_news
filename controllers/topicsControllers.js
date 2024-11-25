const { fetchTopics } = require("../models/topicsModels");

const getAllTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).json({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getAllTopics };
