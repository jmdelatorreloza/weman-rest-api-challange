const jwt = require('jsonwebtoken')
const privateKey = 'gato'

const AuthController = {
    signIn: (req,res) => {
        if(req.body.usuario && req.body.contraseña) {   
            jwt.sign({user: req.body.usuario}, privateKey, function(err, token) {
                    //console.log(token);
                    if(err) {
                        res.status(500).send({message: "se rompió"});
                    } else {
                        res.status(200).send({token});
                    }
                });      
            } else {
                res.status(400).send({message: "se requiere usuario y contraseña"})
            }
        },
    };


module.exports = AuthController;