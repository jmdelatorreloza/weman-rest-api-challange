const jwt = require("jsonwebtoken");
const privateKey = "pingüinos"

const authController = {
  signIn: (req, res) => {
    if (req.body.user && req.body.pass) {
      jwt.sign({user : req.body.user}, privateKey, function(err, token) {
        if(err) {
          res.status(500).send({message: "No funcionó"});
            } else {
              res.status(200).send({token});
            }
          });
    } else {
      res.status(400).send({message : "se necesita usuario y contraseña"});  
    }
  }
};  
  
module.exports = authController;
  
  
  