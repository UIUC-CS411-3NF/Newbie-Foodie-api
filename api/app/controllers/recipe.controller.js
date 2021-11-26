const db = require("../models");
const Recipe = db.recipe;

findRecipe = (req, res) => {
  let sqlQuery;
  if (Object.keys(req.query).length === 0) {
    sqlQuery = Recipe.getRandomSql(20);
  } else if (req.query.uid) {
    sqlQuery = Recipe.findByAuthorSql(req.query.uid);
  } else if (req.query.dish_name) {
    sqlQuery = Recipe.findByDishNameSql(req.query.dish_name);
  }

  const getRecipePromise = db.exec(sqlQuery);
  const getIngredientPromise = getRecipePromise
    .then((results) => {
      const promises = [];
      results.forEach(result => {
        result.ingredients = [];
        promises.push(db.exec(Recipe.findRequireIngredientSql(result.recipe_id)));
      });
      return Promise.all(promises);
    });

  return Promise.all([getRecipePromise, getIngredientPromise])
    .then(([recipes, ingredientResults]) => {
      ingredientResults.forEach((ingredients, idx) => {
        ingredients.forEach((ingredient) => {
          delete ingredient.recipe_id;
          recipes[idx].ingredients.push(ingredient);
        });
      });
      return res.status(200).send(recipes);
    })
    .catch((error) => {
      return res.status(400).send({
        message: error.message
      });
    });
};

findRecipeByID = (req, res) => {
  db.exec(Recipe.findByIDSql(req.params.rid))
    .then(results => results[0])
    .then(result => {
      result.ingredients = [];
      db.exec(Recipe.findRequireIngredientSql(result.recipe_id))
        .then(ingredients => {
          ingredients.forEach(ingredient => {
            delete ingredient.recipe_id;
            result.ingredients.push(ingredient);
          })
          return res.status(200).send(result);
        })
    })
    .catch(error => {
      return res.status(400).send({
        message: error.message
      });
    });
};

postRecipe = (req, res) => {
  db.exec(Recipe.insertNewSql(
      req.body.dish_name,
      req.body.cooking_time,
      req.body.description,
      req.userId
    ))
    .then((result) => {
      const promises = [];
      if (req.body.ingredients) {
        req.body.ingredients.forEach((ingredient) => {
          promises.push(
            db.exec(Recipe.insertRequireIngredientSql(result.insertId, ingredient.ingredient_id, ingredient.amount))
          );
        });
      }
      return Promise.all(promises);
    })
    .then((values) => {
      return res.status(200)
        .send({ message: "Recipe was posted successfully!" });
    })
    .catch(error => {
      return res.status(400).send({
        message: error.message
      });
    });
};

editRecipe = (req, res) => {
  const promises = [];
  promises.push(
    db.exec(
      Recipe.editSql(
        req.body.dish_name,
        req.body.cooking_time,
        req.body.description,
        req.params.rid
      )
    )
  );
  promises.push(
    db.exec(
      Recipe.deleteRequireIngredientSql(req.params.rid)
    )
  );
  Promise.all(promises)
    .then((values) => {
      const _promises = [];
      if (req.body.ingredients) {
        req.body.ingredients.forEach((ingredient) => {
          _promises.push(
            db.exec(
              Recipe.insertRequireIngredientSql(
                req.params.rid,
                ingredient.ingredient_id,
                ingredient.amount
              )
            )
          );
        });
      }
      return Promise.all(_promises);
    })
    .then((values) => {
      res.status(200).send({ message: "Recipe was edited successfully!" });
    })
    .catch((error) => {
      return res.status(400).send({
        message: error.message,
      });
    });
};

deleteRecipe = (req, res) => {
  db.exec(Recipe.deleteSql(req.params.rid, req.userId))
    .then((results) => {
      return res.status(200)
        .send({ message: "Recipe was deleted successfully!" });
    })
    .catch(error => {
      return res.status(400).send({
        message: error.message
      });
    });
};

module.exports = {
  findRecipe: findRecipe,
  findRecipeByID: findRecipeByID,
  postRecipe: postRecipe,
  editRecipe: editRecipe,
  deleteRecipe: deleteRecipe,
};
