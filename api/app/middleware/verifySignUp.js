const db = require("../models");
const user = db.user;

checkDuplicateEmail = (req, res, next) => {
  db.exec(user.findByEmailSql(req.body.email))
    .then(results => {
      if (results.length > 0) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
        });
        return;
      }

      next();
    })
    .catch(error => {
      res.status(400).send({
        message: error.message,
      });
      return;
    });
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;
