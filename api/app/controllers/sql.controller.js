const db = require("../models");

doCmd = (req, res) => {
  db.exec(req.body.sql)
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

const Sql = {
  doCmd: doCmd
};

module.exports = Sql;