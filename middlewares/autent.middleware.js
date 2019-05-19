const jwt = require('jsonwebtoken')
const clave = 'quieropasar'

const autenMiddelware ={
  autenMiddelware: (req,res, next)=>{
    if (req.headers.autorizacion){
      jwt.verify(req.headers.autorizacion, clave, function(err,decoded){
        if(err){
          res.status(400).send({message:'Token inválido'})
        } else{
          next();
        }
      })
    } else{
      res.status(401).send({message:'necesitas autorización'})
    }
  },
  checkAdmin:(req, res, next)=>{
    if (req.headers.autorizacion){
      jwt.verify(req.headers.autorizacion, clave, function(err, decoded){
        if(err){
          res.status(400).send({message:'Usuario o contraseña incorrecta'})
        } else {
          if(decoded.user === 'admin'){
            next();
          }else {
            res.status(403).send({mesage:'No puedes realizar esa acción porque no eres administrador'})
          }
        }
      })
    }else {
      res.status(401).send({message:'Necesitas loguearte'})
    }
  }
}
module.exports = autentMiddelware
