const AuthController = {
    signIn: (req, res) => {
        if (req.body.user && req.body.pass) {
            jwt.sign({ user: req.body.user }, privateKey, function (err, token) {
                if (err) {
                    res.status(500).send({ message: "not good"});
                } else {
                    res.status(200).send({ token });
                }
            });
        } else {
            res.status(400).send({message:"Need user and pass"});
        }
    }
};

module.exports = AuthController;