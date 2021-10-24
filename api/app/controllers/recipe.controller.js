const db = require("../models");
const recipe = db.recipe;

findRecipeByAuthor = (req, res) => {
  if (!req.query || !req.query.uid) {
    return res.status(422).send("NO PARAMS PASSED")
  }

  db.exec(
    recipe.findByAuthorSql(req.query.uid), (error, results) => {
      if (error) {
        res.status(400).send({
          message: error.message
        });
        return;
      }

      console.log(results);

      res.status(200)
        .send(results);
    });
};

findRecipeByID = (req, res) => {
  db.exec(
    recipe.findByIDSql(req.params.rid), (error, results) => {
      if (error) {
        res.status(400).send({
          message: error.message
        });
        return;
      }

      console.log(results);

      res.status(200)
        .send(results);
    });
};

postRecipe = (req, res) => {
  db.exec(
    recipe.insertNewSql(
      req.body.dish_name,
      req.body.cooking_time,
      req.body.description,
      req.userId
    ), (error, results) => {
      if (error) {
        res.status(400).send({
          message: error.message
        });
        return;
      }

      console.log(results);

      res.status(200)
        .send({ message: "Recipe was posted successfully!" });
    });
};

editRecipe = (req, res) => {
  db.exec(
    recipe.editSql(
      req.body.dish_name,
      req.body.cooking_time,
      req.body.description,
      req.params.rid
    ), (error, results) => {
      if (error) {
        res.status(400).send({
          message: error.message
        });
        return;
      }

      console.log(results);

      res.status(200)
        .send({ message: "Recipe was edited successfully!" });
    });
};

deleteRecipe = (req, res) => {
  db.exec(
    recipe.deleteSql(req.params.rid, req.userId), (error, results) => {
      if (error) {
        res.status(400).send({
          message: error.message
        });
        return;
      }

      console.log(results);

      res.status(200)
        .send({ message: "Recipe was deleted successfully!" });
    });
};

const Recipe = {
  findRecipeByAuthor: findRecipeByAuthor,
  findRecipeByID: findRecipeByID,
  postRecipe: postRecipe,
  editRecipe: editRecipe,
  deleteRecipe: deleteRecipe
};

module.exports = Recipe;