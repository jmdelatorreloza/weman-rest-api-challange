const privateKey = "hardcodeado"

const AuthMiddleware = {
    authMiddleware: (req, res, next) => {
        if(req.headers.authorization) {
          jwt.verify(req.headers.authorization, privateKey, function(err, decoded) {
              if(err) {
                  res.status(400).send({message: "Yeii pasaste :3"});
              } else {
                  next ();
              }
          });
        } else {
            res.status(401).send({message:"No enviaste bien el header con el token T.T"});
        }
    },
    Admin: (req, res, next) => {
        if(req.headers.authorization) {
            jwt.verify(req.headers.authorization, privateKey, function(err, decoded) {
                if(err) {
                    res.status(400).send({message: "Mal token"});
                } else {
                    if(decoded.usr === 'admin') {
                        next();
                } else {
                    res.status(403).send({message:"You shall not pass"})
                }
            }
        }):
    } else {
        res.status(401).send({message: "No enviaste bien el header para auth con admin"})
    }    
}

module.exports = AuthMiddleware;