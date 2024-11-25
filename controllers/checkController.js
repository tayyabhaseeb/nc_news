const endpointsJson = require("../endpoints.json");

const checkApi = (req, res) => {
  res.status(200).send({ endpoints: endpointsJson });
};

module.exports = checkApi;
