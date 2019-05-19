const jwt = require ('jsonwebtoken');
const privateKey = 'tacos'

const authMiddleware = {
	authMiddleware :(req, res, next) =>{
		if(req.headers.authorization){
			jwt.verify(req.headers.authorization, privateKey, function(err, decoded){
				if(err){
					res.status(400).send({message:"token invalido"});
				}else{
					next();
				}
			});
	}else{
		res.status(401).send({message:"necesitas enviar el header de autorizacion con token"});
		}

	},
	checkAdmin:(req, res, next)=>{
		if(req.headers.authorization){
			jwt.verify(req.headers.authorization, privateKey, function(err, decoded){
				if(err){
					res.status(400).send({message:"token invalido"});
				}else{
					if(decoded.user==='admin'){ 
					next();
				}else{
		res.status(401).send({message:"No eres admin"});
		}


	}
}

module.exports=authMiddleware;