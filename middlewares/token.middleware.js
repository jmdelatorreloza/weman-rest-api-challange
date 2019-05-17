var jwt = require('jsonwebtoken');
const privateKey = "yaestalisto";

//middleware
const AuthorizationMiddleware = {
    authMiddleware: (req, res, next) => {
        if (req.headers.authorization) {
            jwt.verify(req.headers.authorization, privateKey, function (err, decoded) {
                if (err) {
                    res.status(400).send('Houston, we have a problem! cannor access, check your token')
                } else {
                    // checar ese usuario en la base datos a ver si existe
                    next();
                }
            });
        } else {
            res.status(401).send({ message: "Asegurate de estar enviando token y header de autorization" })
        }
    },

    admin: (req, res, next) => {
        if (req.headers.authorization) {
            jwt.verify(req.headers.authorization, privateKey, function (err, decoded) {
                if (err) {
                    res.status(400).send('Houston, we have a problem! cannot access, check your token')
                } else {
                    if (decoded.user === 'admin') {
                        next();
                    } else {
                        res.status(403).send('No tienes permisos de ADMIN para entrar a esto!')
                    }
                }
            });
        } else {
            res.status(401).send({ message: "Asegurate de estar enviando token y header de autorization" })
        }
    }
}


module.exports = AuthorizationMiddleware;