const { authJwt } = require("../middleware");
const controller = require("../controllers/review.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/review/:review_id", controller.findReviewByID);

  app.post(
    "/api/v1/review/post",
    [authJwt.verifyToken],
    controller.postReview
  );

  app.post(
    "/api/v1/review/:review_id/edit",
    [authJwt.verifyToken],
    controller.editReview
  );

  app.delete(
    "/api/v1/review/:review_id/delete",
    [authJwt.verifyToken],
    controller.deleteReview
  );
};
