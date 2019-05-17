var jwt = require('jsonwebtoken');
const privateKey = "yaestalisto";

const Authentication = {
    authenticate: (req, res) => {
        if (!(req.body.user && req.body.pass)) {
            res.status(400).send("Se necesita usuario (user) y contraseña (pass)!")
        } else {
            jwt.sign({ user: req.body.user }, privateKey, function (err, token) {
                if (err) {
                    res.send(500).send({ message: "No valido" });
                } else {
                    res.status(200).send({ token: token })
                }
            });
        }
    }
}

module.exports = Authentication;