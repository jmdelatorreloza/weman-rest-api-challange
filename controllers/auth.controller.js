const jwt = require('jsonwebtoken');
const privateKey = "hardcoded"

const authController = {
    signIn: (req, res) => {
        if(req.body.usr && req.body.passw) {
           jwt.sign({user: req.body.usr}, privateKey, function(err, token) {
            if(err) {
                res.status(500).send({message:"mori en la autenticacion u.u"})
            } else {
                res.status(200).send({token})
            }
            });
        } else {
          res.status(400).send({message: "No has enviado usuario y contraseña"})
        }
    } 
}

module.exports = authController;