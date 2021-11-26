const db = require("../models");
const Utensil = db.utensil;

getAllUtensils = (req, res) => {
  db.exec(Utensil.getAllSql())
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
  getAllUtensils: getAllUtensils,
};
