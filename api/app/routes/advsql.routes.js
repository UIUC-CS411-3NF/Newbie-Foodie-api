const { authJwt } = require("../middleware");
const controller = require("../controllers/advsql.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/advsql/1", controller.advSql1);

  app.get("/api/v1/advsql/2", controller.advSql2);
};