const { getAllUsers } = require("../controllers/usersControllers");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getAllUsers);

module.exports = usersRouter;
