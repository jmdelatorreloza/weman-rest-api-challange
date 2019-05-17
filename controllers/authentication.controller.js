var jwt = require('jsonwebtoken');

const Authentication = {
    authenticate: (req, res) => {
        const privateKey = "yaestalisto";
            if (!(req.body.user && req.body.pass)) {
                res.status(400).send("Se necesita usuario y contraseña!")
            } else {
        
                jwt.sign({ user: req.body.user }, privateKey, function (err, token) {
                    if (err) {
                        res.send(500).end();
                    } else {
                        res.status(200).send({ token: token })
                    }
                });
            }
        }
} 
  
  module.exports = Authentication;