const laLLaveSecreta = "tamal";

const AuthController = {
    sigIn: (req, res) => {
        jwt.sigin({foo : 'bar'}, laLLaveSecreta, {algorithm: 'RS256'}, function(err, token) {
            console.log(token);
        });
    }
}

module.exports = AuthController;
