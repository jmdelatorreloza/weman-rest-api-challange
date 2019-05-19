const jwt = require('jsonwebtoken');
const privateKey = 'gato'

const AuthMidleware = {
    authmidleware: (req, res, next) => {
        //console.log('test');
    if(req.headers.autorización) {
        jwt.verify(req.headers.authorization, privateKey, function(err,decode) {
        if(err) {
            res.status(400).send({message:"El token no es válido"});
        } else {
            next();
            }
        });
    }else {
        res.status(401).send({message: 'se requiere athorizationheader con token'});
        }
    }
};

module.exports = AuthMidleware;