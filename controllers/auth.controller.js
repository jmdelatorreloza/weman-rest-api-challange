const privateKey = "tacos"
const privateKey= "tacos"

const authController = {
	signIn:(req, res) =>{
		if(req.body.user && req.body.pass){
			jwt.sign(req.body, privateKey, function(err, token){
				if(err){
					res.status(500).send({mesagge:"No funciona"});
		}else{
			res.status(200).send({token})
			}
		});
	}else{
		req.status(400).send({mesagge: "Manda user y pass"})
		}
	
	},
	checkAdmin: (req, res, next)=>{
		
	}

}

module.exports = authController;