const db = require("../models");
const Ingredient = db.ingredient;

getAllIngredients = (req, res) => {
  db.exec(Ingredient.getAllSql())
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

module.exports = {
  getAllIngredients: getAllIngredients,
};
