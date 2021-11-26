const db = require("../models");
const Foodtype = db.foodtype;

getAllFoodtypes = (req, res) => {
  db.exec(Foodtype.getAllSql())
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      return res.status(400).send({
        message: error.message,
      });
    });
};

module.exports = {
  getAllFoodtypes: getAllFoodtypes,
};
