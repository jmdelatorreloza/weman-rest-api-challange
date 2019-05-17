const jwt = require("jsonwebtoken");
const autentifica = {
    signIn: (req, res) => {
        if (!(req.body.user && req.body.pass)){
            res.status(400).send("se necesita usuario y contraseña")
        }
        jwt.sign({ user: req.body.user, theme: 'black' }, privateKey, function(err, token) {
            if(err) {
              res.status(500).send({message: "No funcionó"});
            } else {
              res.status(200).send({token: token})
            }
          });
    }
     
  };
  module.exports = autentifica;
  
  
  