const db = require("../models");
const user = db.user;

checkDuplicateEmail = (req, res, next) => {
  db.exec(user.findByEmailSql(req.body.email), (error, results) => {
    if (error) {
      res.status(400).send({
        message: error.message,
      });
      return;
    }

    if (results.length > 0) {
      res.status(400).send({
        message: "Failed! Email is already in use!",
      });
      return;
    }

    next();
  });
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;
