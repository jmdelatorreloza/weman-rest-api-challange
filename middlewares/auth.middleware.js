const jwt = require('jsonwebtoken');
const privateKey = "tacos"

const AuthMiddleware = {
  authMiddleware: (req, res, next) => {
    if(req.headers.authorization) {
      jwt.verify(req.headers.authorization, privateKey, function(err, decoded) {
        if(err) {
          res.status(400).send({message: "Token invalido"});
        } else {
          next();
        }
      });
    } else {
      res.status(401).send({message: "necesitas enviar el header de authorizacion con tu token"});
    }
  }
}

module.exports = AuthMiddleware;