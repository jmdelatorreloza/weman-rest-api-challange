const jwt = require('jsonwebtoken');
const privateKey = "tacos"

const AuthController = {
  signIn: (req, res) => {
    if(req.body.user && req.body.pass) {
      jwt.sign({user: req.body.user}, privateKey, function(err, token) {
        if(err) {
          res.status(500).send({message: "valio chorizo"});
        } else {
          res.status(200).send({token});
        }
      });
    } else {
      res.status(400).send({message: "Necesitas mandar user and pass"})
    }
  }
}

module.exports = AuthController;