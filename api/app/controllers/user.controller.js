const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.topActiveUsers = (req, res) => {
  db.exec(User.findTopActiveSql())
    .then((results) => {
      return res.status(200).send(results);
    })
    .catch((error) => {
      return res.status(400).send({
        message: error.message,
      });
    });
};
