const db = require("../models");
const config = require("../config/auth.config");
const user = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


verify = (req, res) => {
  return res
    .status(200)
    .json({ userId: req.userId, message: "Authorized"});
};

signup = (req, res) => {
  // TODO: these three should be in a transaction or sth
  db.exec(user.insertNewUserSql(req.body.email, req.body.username))
    .then(results => {
      const user_id = results.insertId;
      db.exec(
        user.insertNewAuthSql(
          user_id,
          bcrypt.hashSync(req.body.password, 8)
        ))
        .then(results => {
          description = "Welcome to my profile!";
          photo = "default_photo_url";
          db.exec(user.insertNewProfileSql(user_id, description, photo))
            .then(results => {
              res.status(200).send({
                message: "User was registered successfully!"
              });
            })
            .catch(error => {
              res.status(400).send({
                message: error.message,
              });
              return;
            });
        })
        .catch(error => {
          res.status(400).send({
            message: error.message,
          });
          return;
        });
    })
    .catch(error => {
      res.status(400).send({
        message: error.message,
      });
      return;
    });
};

signin = (req, res) => {
  db.exec(user.findByEmailWithAuthSql(req.body.email))
    .then(results => {
      if (results.length == 0) {
        res.status(400).send({
          message: "Failed! Email or password incorrect!",
        });
        return;
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        results[0].password_hash
      );

      if (!passwordIsValid) {
        res.status(400).send({
          message: "Failed! Email or password incorrect!",
        });
        return;
      }

      var token = jwt.sign(
        { id: results[0].user_id },
        config.secret,
        { expiresIn: 86400 } // 24 hours
      );

      /*
       *  This is use if jwt is handled by front-end
       */


      // res.status(200).send({
      //  id: user.id,
      //  username: results[0].username,
      //  email: results[0].email,
      //  accessToken: token
      // });

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ message: "Sign in successfully!" });
    })
    .catch(error => {
      res.status(400).send({
        message: error.message,
      });
      return;
    });
};

signout = (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Sign out successfully!" });
};

const auth = {
  signup: signup,
  signin: signin,
  signout: signout,
  verify: verify
};

module.exports = auth;