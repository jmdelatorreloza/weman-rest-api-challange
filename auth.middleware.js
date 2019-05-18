const privateKey = "Abracadabra2"

const authMiddleware ={
	authMiddleware: (req, res, next) => {
		if (req.headers.authorization) {
		jwt.verify(token, 'holo', function(err,decoded) {
			console.log(decoded.foo)
		});
			next();
	} else {
		res.status(401).send({message: "Se necesita que mandes header de autorización con tu token"})
	}

},

	checkAdmin: (req, res, next) => {
		if (req.headers.authorization) {
		jwt.verify(req.headers.authorization, privateKey, function(err,decoded) {
			if (err) {
				res.status(400).send({message: "No es válido el token"});
			} else {		
				next();	
	     	}
		});
		
	} else {
		res.status(401).send({message: "Se necesita que mandes header de autorización con tu token"})
	}
}
}


module.exports = authMiddleware;