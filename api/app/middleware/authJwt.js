const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
  /*
   *	This is use if jwt is handled by front-end
   */

  // const token = req.headers["x-access-token"];
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        message: "Unauthorized!",
      });
    }

    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken
};

module.exports = authJwt;
