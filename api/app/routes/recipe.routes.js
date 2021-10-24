const { authJwt } = require("../middleware");
const controller = require("../controllers/recipe.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/recipe", controller.findRecipeByAuthor);

  app.get("/api/v1/recipe/:rid", controller.findRecipeByID);

  app.post(
    "/api/v1/recipe/post",
    [authJwt.verifyToken],
    controller.postRecipe
  );

  app.post(
    "/api/v1/recipe/:rid/edit",
    [authJwt.verifyToken],
    controller.editRecipe
  );

  app.delete(
    "/api/v1/recipe/:rid/delete",
    [authJwt.verifyToken],
    controller.deleteRecipe
  );
};