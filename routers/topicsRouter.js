const {
  getAllTopics,
  addNewTopic,
} = require("../controllers/topicsControllers");

const topicsRouter = require("express").Router();

topicsRouter.route("/").get(getAllTopics).post(addNewTopic);

module.exports = topicsRouter;
