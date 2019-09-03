const jwt = require("jsonwebtoken");
const secret = require("../secret.js");
/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, secret.JWTsecret, (err, decodedToken) => {
    if (err) {
      res
        .status(401)
        .json({ message: "You shall not pass!", error: err.message });
    } else {
      req.decodedToken = decodedToken;
      next();
    }
  });
};
