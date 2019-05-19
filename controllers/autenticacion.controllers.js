const elToken = require('jsonwebtoken'); //nombre formal: jwt
const laLlavePrivada = "ahiTeVa"; //nombre formal: privateKey

//6_Constante-función para crear una cuenta, puede ser usuario general o usuario autorizado para ser administrador
const controlAutenticacion = {

    signIn: (req, res) => {
        if(req.body.usuario && req.body.contrasena) {
            elToken.sign({usuario: req.body.usuario}, laLlavePrivada, function(err, token) { //aquí creamos un user y pass y si es admi o no, mediante la generación de un token
                if(err) {
                    res.status(500).send({message: "Algo salió mal, lo siento."});
                } else { 
                    res.status(200).send({token});
                }
            });
        } else {
            res.status(400).send({message: "Necesitas mandar usuario y contrasena"})
        }
    }
}

module.exports = controlAutenticacion;

//anota vias en postman