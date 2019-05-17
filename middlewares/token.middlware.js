

//middleware
app.use((request, response, next) => {
    jwt.verify(request.headers.authorization, privateKey, function (err, decoded) {
        if (err) {
            response.status(500).end('Houston, we have a problem! cannor access, check your token')
        } else {
            console.log(decoded)
            // checar ese usuario en la base datos a ver si existe
            next();
        }
    });
});

//otro endpoint
app.get('/fin', (request, response) => {
    response.send("¡Acabaste! Felicidades!");
});