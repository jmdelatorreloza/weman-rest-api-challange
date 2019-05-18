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
    },
    checkAdmin: (req, res, next) => {
        if (req.headers.authorization) {
            jwt.verify(req.headers.authorization, privateKey, function (err, token) {
                if (err) {
                    res.status(400).send({ message: "Token invalido" });
                } else {
                    if (decoded.user === 'admin') {
                        next();
                    } else {
                        res.status(403).send({ message: "Not today" })
                    }
                }
            });
        } else {
            res.status(401).send({ message: "send header auth & token" });
        }
    }
}

module.exports = AuthMiddleware;
