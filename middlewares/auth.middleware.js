const jwt = require('jsonwebtoken');
const privateKey = "funkydance!"

const AuthMiddleware = {
    authMiddleware: (req, res, next) => {
        if (req.headers.authorization) {
            jwt.verify(req.headers.authorization, privateKey, function (err, token) {
                if (err) {
                    res.status(400).send({ message: "Token invalido" });
                } else {
                    next();
                }
            });
        } else {
            res.status(401).send({ message: "send header auth & token" });
        }
    }
}

module.exports = AuthMiddleware;

/* error in cmder C:\Users\wemenconnect\Documents\weman-rest-api-challange\node_modules\express\lib\application.js:210
    throw new TypeError('app.use() requires a middleware function')*/