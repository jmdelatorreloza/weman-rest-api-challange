const elToken = require('jsonwebtoken');
const laLlavePrivada = "ahiTeVa";

const AutorizacionMiddlewareToken = {

    //7_middleware para revisar que token del usuario general o administrador sea válido, esto mediante su token
    mdlwValidacionGeneral: (req, res, next) => {
        if (req.headers.autorizacion) {//poner en postman en el HEADER ojo, "autorizacion"
            elToken.verify(req.headers.autorizacion, laLlavePrivada, function (err, decoded) {
                if (err) {
                    res.status(400).send('Estás mal, tu token está mal, todo mal')
                } else {
                    next(); //recordar no olvidar poner los next en los middlewares
                }
            });
        } else {
            res.status(401).send({ message: "Ojo, pon bien el token y autorizacion en HEADER." })
        }
    },

    //8_middleware para verificar si el usuario tiene permiso de administración, esto mediante su token
    mdlwValidacionAdministrador: (req, res, next) => {
        if (req.headers.authorization) {
            elToken.verify(req.headers.authorization, privateKey, function (err, decoded) {
                if (err) {
                    res.status(400).send('Estás mal, tu token está mal, todo mal')
                } else {
                    if (decoded.user === 'administrador') {
                        next();
                    } else {
                        res.status(403).send('No eres administrador, sorry')
                    }
                }
            });
        } else {
            res.status(401).send({ message: "Ojo, pon bien el token y autorizacion en HEADER." })
        }
    }
}

module.exports = AutorizacionMiddlewareToken;