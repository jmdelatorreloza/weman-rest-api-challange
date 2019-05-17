const jwt = require('jsonwebtoken');
const privateKey = 'llave';

const AuthMiddleware ={
    authMiddleware : (req, res, next) => {
        if(req.headers.authorization){
            jwt.verify(req.headers.authorization, privateKey, function (err, decoded) {
                if (err) {
                    res.status(500).end('error aqui');
                } else {
                    console.log(decoded);
                    // checar ese usuario en la base datos a ver si existe
                    next();
                }
            });
        }else{
            res.status(401).send({message:"Falta el header y el token"});
        }
    }
}

module.exports = AuthMiddleware;