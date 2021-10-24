const db = require("../models");
const config = require("../config/auth.config");
const user = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

signup = (req, res) => {
  // TODO: these three should be in a transaction or sth
  db.exec(
    user.insertNewUserSql(req.body.email, req.body.username),
    (error, results) => {
      if (error) {
        res.status(400).send({
          message: error.message,
        });
        return;
      }

      const user_id = results.insertId;
      db.exec(
        user.insertNewAuthSql(user_id, bcrypt.hashSync(req.body.password, 8)),
        (error, results) => {
          if (error) {
            res.status(400).send({
              message: error.message,
            });
            return;
          }
        }
      );
      description = "Welcome to my profile!";
      photo = "default_photo_url";
      db.exec(
        user.insertNewProfileSql(user_id, description, photo),
        (error, results) => {
          if (error) {
            res.status(400).send({
              message: error.message,
            });
            return;
          }
          res.status(200).send({
            message: "User was registered successfully!",
            results: results,
          });
        }
      );
    }
  );
};

signin = (req, res) => {
  db.exec(user.findByEmailWithAuthSql(req.body.email), (error, results) => {
    if (error) {
      res.status(400).send({
        message: error.message,
      });
      return;
    }

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
      { id: results[0].id },
      config.secret,
      { expiresIn: 86400 } // 24 hours
    );

    /*
     *	This is use if jwt is handled by front-end
     */

    // res.status(200).send({
    // 	id: user.id,
    // 	username: results[0].username,
    // 	email: results[0].email,
    // 	accessToken: token
    // });

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Sign in successfully!" });
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
};

module.exports = auth;
