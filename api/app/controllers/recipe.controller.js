const db = require("../models");
const Recipe = db.recipe;
const Review = db.review;

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
  const getFoodtypePromise = getRecipePromise
    .then((results) => {
      const promises = [];
      results.forEach(result => {
        result.foodtypes = [];
        promises.push(db.exec(Recipe.findFoodtypeSql(result.recipe_id)));
      });
      return Promise.all(promises);
    });
  const getUtensilPromise = getRecipePromise
    .then((results) => {
      const promises = [];
      results.forEach(result => {
        result.utensils = [];
        promises.push(db.exec(Recipe.findUtensilSql(result.recipe_id)));
      });
      return Promise.all(promises);
    });
  const getReviewPromise = getRecipePromise
    .then((results) => {
      const promises = [];
      results.forEach(result => {
        result.reviews = [];
        promises.push(db.exec(Review.findByRecipeSql(result.recipe_id)));
      });
      return Promise.all(promises);
    })

  return Promise.all([getRecipePromise, getIngredientPromise, getFoodtypePromise, getUtensilPromise, getReviewPromise])
    .then(([recipes, ingredientResults, foodtypeResults, utensilResults, reviewResults]) => {
      ingredientResults.forEach((ingredients, idx) => {
        ingredients.forEach((ingredient) => {
          delete ingredient.recipe_id;
          recipes[idx].ingredients.push(ingredient);
        });
      });
      foodtypeResults.forEach((foodtypes, idx) => {
        foodtypes.forEach((foodtype) => {
          delete foodtype.recipe_id;
          recipes[idx].foodtypes.push(foodtype);
        });
      });
      utensilResults.forEach((utensils, idx) => {
        utensils.forEach((utensil) => {
          delete utensil.recipe_id;
          recipes[idx].utensils.push(utensil);
        });
      });
      reviewResults.forEach((reviews, idx) => {
        reviews.forEach((review) => {
          delete review.recipe_id;
          recipes[idx].reviews.push(review);
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
  const getRecipePromise = db.exec(Recipe.findByIDSql(req.params.rid));
  const getIngredientPromise = getRecipePromise
    .then((results) => results[0])
    .then((result) => {
      result.ingredients = [];
      return db.exec(Recipe.findRequireIngredientSql(result.recipe_id));
    });
  const getFoodtypePromise = getRecipePromise
    .then((results) => results[0])
    .then((result) => {
      result.foodtypes = [];
      return db.exec(Recipe.findFoodtypeSql(result.recipe_id));
    });
  const getUtensilPromise = getRecipePromise
    .then((results) => results[0])
    .then((result) => {
      result.utensils = [];
      return db.exec(Recipe.findUtensilSql(result.recipe_id));
    });
  const getReviewPromise = getRecipePromise
    .then((results) => results[0])
    .then((result) => {
      result.reviews = [];
      return db.exec(Review.findByRecipeSql(result.recipe_id));
    });

  return Promise.all([getRecipePromise, getIngredientPromise, getFoodtypePromise, getUtensilPromise, getReviewPromise])
    .then(([recipes, ingredients, foodtypes, utensils, reviews]) => {
      recipe = recipes[0];
      ingredients.forEach((ingredient) => {
        delete ingredient.recipe_id;
        recipe.ingredients.push(ingredient);
      });
      foodtypes.forEach((foodtype) => {
        delete foodtype.recipe_id;
        recipe.foodtypes.push(foodtype);
      });
      utensils.forEach((utensil) => {
        delete utensil.recipe_id;
        recipe.utensils.push(utensil);
      });
      reviews.forEach((review) => {
        delete review.recipe_id;
        recipe.reviews.push(review);
      });
      return res.status(200).send(recipe);
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
      if (req.body.foodtypes) {
        req.body.foodtypes.forEach((foodtype) => {
          promises.push(
            db.exec(Recipe.insertFoodtypeSql(result.insertId, foodtype.foodtype_id))
          );
        });
      }
      if (req.body.utensils) {
        req.body.utensils.forEach((utensil) => {
          promises.push(
            db.exec(Recipe.insertUtensilSql(result.insertId, utensil.utensil_id))
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
    ),
    db.exec(
      Recipe.deleteRequireIngredientSql(req.params.rid)
    ),
    db.exec(
      Recipe.deleteFoodtypeSql(req.params.rid)
    ),
    db.exec(
      Recipe.deleteUtensilSql(req.params.rid)
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
      if (req.body.foodtypes) {
        req.body.foodtypes.forEach((foodtype) => {
          _promises.push(
            db.exec(
              Recipe.insertFoodtypeSql(
                req.params.rid,
                foodtype.foodtype_id,
              )
            )
          );
        });
      }
      if (req.body.utensils) {
        req.body.utensils.forEach((utensil) => {
          _promises.push(
            db.exec(
              Recipe.insertUtensilSql(
                req.params.rid,
                utensil.utensil_id,
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
