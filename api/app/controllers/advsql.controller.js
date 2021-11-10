const db = require("../models");

advSql1 = (req, res) => {
  if (!req.query || !req.query.cooking_time) {
    req.query.cooking_time = 20;
  }

  if (!req.query.ingredient_amount) {
    req.query.ingredient_amount = 3;
  }

  let sql = `SELECT DISTINCT dish_name, cooking_time FROM Recipe WHERE cooking_time = ${req.query.cooking_time} UNION SELECT dish_name, cooking_time FROM Recipe r LEFT JOIN RecipeRequireIngredient i ON (r.recipe_id = i.recipe_id) WHERE i.amount = ${req.query.ingredient_amount} LIMIT 15;`

  db.exec(sql)
    .then(results => {
      console.log(results);
      res.status(200).send(results);
    })
    .catch(error => {
      res.status(400).send({
        message: error.message
      });
      return;
    });
};

advSql2 = (req, res) => {
  if (!req.query || !req.query.rate) {
    req.query.rate = 3;
  }

  let sql = `SELECT DISTINCT r.recipe_id, r.dish_name, r.cooking_time, u.rate FROM UserReviewRecipe u LEFT JOIN Recipe r ON (u.recipe_id = r.recipe_id) WHERE u.rate = ${req.query.rate} AND r.cooking_time = (SELECT Recipe.cooking_time FROM Recipe LEFT JOIN Status On (Recipe.status_id = Status.status_id) WHERE Status.status_id = 1 ORDER BY Recipe.cooking_time LIMIT 1) LIMIT 15;`

  db.exec(sql)
    .then(results => {
      console.log(results);
      res.status(200).send(results);
    })
    .catch(error => {
      res.status(400).send({
        message: error.message
      });
      return;
    });
};

const AdvSql = {
  advSql1: advSql1,
  advSql2: advSql2
};

module.exports = AdvSql;