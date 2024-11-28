const { getAllTopics } = require("../controllers/topicsControllers");

const topicsRouter = require("express").Router();

topicsRouter.route("/").get(getAllTopics);

module.exports = topicsRouter;
