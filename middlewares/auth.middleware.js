const privateKey = "oncetacos"

const autentMiddleware = {
    autentificarnos: (req, res) => {
        if (req.headers.authorization){

            jwt.verify(req.headers.authorization, privateKey, function(err, decoded) {
                if(err) {
                  res.status(400).send({message: "Token inválido"});
                } else {
                  console.log(decoded)
                  // checar ese usuario en la base datos a ver si existe
                  next()
                }
              }
            )
        }
    },

    checkAdmin: (req, res, next) => {


        valida: (req, res) => {
            res.send("si hay pingüinos");
        },
        
}

app.use("/auth/signin", booksController.comprueba);

app.get("/pingüinos", booksController.valida);
