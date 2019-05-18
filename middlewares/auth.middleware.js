const privateKey = "oncetacos";

const autentMiddleware = {
  authMiddleware: (req, res) => {
    if (req.headers.authorization){
      jwt.verify(req.headers.authorization, privateKey, function(err, decoded) {
        if(err) {
          res.status(400).send({message: "Token inválido"});
        } else {
            next();
          }
      });
    } else {
      res.status(401).send({message : "Necesitas enviar tu token en el header"});
    }
            
  },

  checkAdmin: (req, res) => {
    if (req.headers.authorization) {
      jwt.verify(req.headers.authorization, privateKey, function(err, decoded) {
        if (err) {
          res.status(400).send({message : "Token no válido"});
        } else {
          if (decoded.user === "admin") {
            next();
        } else {
          res.status(403).send({message : "No puedes hacer esta función"});          
          }   
        }
    });
    } else {
      res.status(401).send({message : "Es necesario que envíes el header de autorización con tu token"});
    }  
  }
};

module.exports = autentMiddleware;