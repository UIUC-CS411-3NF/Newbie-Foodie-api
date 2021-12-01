const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


verify = (req, res) => {
  db
    .exec(User.findByIdSql(req.userId))
    .then(results => results[0])
    .then(result => {
      return res
        .status(200)
        .json({
          message: "Authorized",
          data: result,
        });
    });
};

signup = (req, res) => {
  // TODO: these three should be in a transaction or sth
  // TODO: check username / email existence
  db.exec(User.insertNewUserSql(req.body.email, req.body.username))
    .then((result) => result.insertId)
    .then((user_id) => {
      const insertNewAuth = db.exec(
        User.insertNewAuthSql(user_id, bcrypt.hashSync(req.body.password, 8))
      );
      const description = "Welcome to my profile!";
      const photo = "default_photo_url";
      const insertNewProfile = db.exec(User.insertNewProfileSql(user_id, description, photo));
      return Promise.all([insertNewAuth, insertNewProfile]);
    })
    .then((results) => {
      return res.status(200).json({
        message: "User was registered successfully!"
      });
    })
    .catch((error) => {
      return res.status(400).send({
        message: error.message
      });
    });
};

signin = (req, res) => {
  db.exec(User.findByEmailWithAuthSql(req.body.email))
    .then((results) => {
      if (results.length == 0) {
        return res.status(400).send({
          message: "Failed! Email or password incorrect!",
        });
      }
      return results[0];
    })
    .then((user) => {
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password_hash
      );

      if (!passwordIsValid) {
        return res.status(400).send({
          message: "Failed! Email or password incorrect!",
        });
      }

      const token = jwt.sign(
        { id: user.user_id },
        config.secret,
        { expiresIn: 86400 } // 24 hours
      );

      /*
       *  This is use if jwt is handled by front-end
       */


      // res.status(200).send({
      //  id: user.id,
      //  username: user.username,
      //  email: user.email,
      //  accessToken: token
      // });

      return res
        .cookie("__session", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ message: "Sign in successfully!" });
    })
    .catch(error => {
      console.log(error)
      return res.status(400).send({
        message: error.message,
      });
    });
};

signout = (req, res) => {
  return res
    .clearCookie("__session")
    .status(200)
    .json({ message: "Sign out successfully!" });
};

module.exports = {
  signup: signup,
  signin: signin,
  signout: signout,
  verify: verify
};
