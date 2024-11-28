const {
  getAllUsers,
  getSpecificUser,
} = require("../controllers/usersControllers");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getAllUsers);
usersRouter.route("/:username").get(getSpecificUser);

module.exports = usersRouter;
