const checkApi = require("../controllers/checkController");

const apiRouter = require("express").Router();

apiRouter.route("/").get(checkApi);

module.exports = apiRouter;
