const db = require("../models");
const recipe = db.recipe;

findRecipeByAuthor = (req, res) => {
  if (!req.query || !req.query.uid) {
    return res.status(422).send("NO PARAMS PASSED")
  }

  db.exec(recipe.findByAuthorSql(req.query.uid))
    .then(results => results[0])
    .then(result => {
      result.ingredients = [];
      db.exec(recipe.findRequireIngredientSql(result.recipe_id))
        .then(ingredients => {
          ingredients.forEach(ingredient => {
            delete ingredient.recipe_id;
            result.ingredients.push(ingredient);
          })
          res.status(200).send(result);
        })
    })
    .catch(error => {
      res.status(400).send({
        message: error.message
      });
      return;
    });
};

findRecipeByID = (req, res) => {
  db.exec(recipe.findByIDSql(req.params.rid))
    .then(results => results[0])
    .then(result => {
      result.ingredients = [];
      db.exec(recipe.findRequireIngredientSql(result.recipe_id))
        .then(ingredients => {
          ingredients.forEach(ingredient => {
            delete ingredient.recipe_id;
            result.ingredients.push(ingredient);
          })
          res.status(200).send(result);
        })
    })
    .catch(error => {
      res.status(400).send({
        message: error.message
      });
      return;
    });
};

postRecipe = (req, res) => {
  db.exec(recipe.insertNewSql(
      req.body.dish_name,
      req.body.cooking_time,
      req.body.description,
      req.userId
    ))
    .then(result => {
      console.log(result);
      const promises = [];
      console.log(req.body.ingredients)
      if (req.body.ingredients) {
        req.body.ingredients.forEach(ingredient => {
          promises.push(
            db.exec(recipe.insertRequireIngredientSql(result.insertId, ingredient.ingredient_id, ingredient.amount))
          )
        })
      }
      Promise.all(promises).then((values) => {
        console.log(values);
      });
      res.status(200)
        .send({ message: "Recipe was posted successfully!" });
    })
    .catch(error => {
      res.status(400).send({
        message: error.message
      });
      return;
    });
};

editRecipe = (req, res) => {
  db.exec(recipe.editSql(
      req.body.dish_name,
      req.body.cooking_time,
      req.body.description,
      req.params.rid
    ))
    .then(results => {
      console.log(results);
      res.status(200)
        .send({ message: "Recipe was edited successfully!" });
    })
    .catch(error => {
      res.status(400).send({
        message: error.message
      });
      return;
    });
};

deleteRecipe = (req, res) => {
  db.exec(recipe.deleteSql(req.params.rid, req.userId))
    .then(results => {
      console.log(results);
      res.status(200)
        .send({ message: "Recipe was deleted successfully!" });
    })
    .catch(error => {
      res.status(400).send({
        message: error.message
      });
      return;
    });
};

findRecipeByDishName = (req, res) => {
  if (!req.query || !req.query.dish_name) {
    req.query.dish_name = '';
  }

  db.exec(recipe.findByDishNameSql(req.query.dish_name))
    .then(results => results[0])
    .then(result => {
      result.ingredients = [];
      db.exec(recipe.findRequireIngredientSql(result.recipe_id))
        .then(ingredients => {
          ingredients.forEach(ingredient => {
            delete ingredient.recipe_id;
            result.ingredients.push(ingredient);
          })
          res.status(200).send(result);
        })
    })
    .catch(error => {
      res.status(400).send({
        message: error.message
      });
      return;
    });
};

const Recipe = {
  findRecipeByAuthor: findRecipeByAuthor,
  findRecipeByID: findRecipeByID,
  postRecipe: postRecipe,
  editRecipe: editRecipe,
  deleteRecipe: deleteRecipe,
  findRecipeByDishName: findRecipeByDishName
};

module.exports = Recipe;