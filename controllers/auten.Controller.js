const clave = "quieropasar"

const autenController={
  singIn: (req,res)=>{
    if (req.body.user && req.body.pass){
      jwt.sing(user:req.body.user, clave, function(err,token){
        if (err){
          res.status(500).send({message:'usuario o contraseña incorrectas'})
        } else{
          res.status(200).send({token})
        }
      })
      res.status(200).end();
    }else{
      req.status(400).send({message:'necesitas autenticarte con tu usuario y contraseña'})
    }
  }
}

module.exports = autenController;
