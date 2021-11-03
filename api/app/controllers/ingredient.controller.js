const db = require("../models");
const ingredient = db.ingredient;

getAllIngredients = (req, res) => {
  db.exec(ingredient.getAllSql())
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message,
      });
      return;
    });
};

const Ingredient = {
  getAllIngredients: getAllIngredients,
};

module.exports = Ingredient;
