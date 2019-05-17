const jwt = require('jsonwebtoken');
const privateKey = 'llave';

const AuthController ={
    authBook: (req, res) => {
        if (!(req.body.user && req.body.pass)) {
          res.status(400).send('Necesitas introducir usuario y contraseña');
        }
        jwt.sign({ user: req.body.user }, privateKey, function (err, token) {
          if (err) {
            res.send(500).end();
          } else {
            res.status(200).send({ token: token })
          }
        });
      }
} 
module.exports = AuthController;