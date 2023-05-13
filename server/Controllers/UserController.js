const {parseToken} = require('../util')
const sqlCode = require('../SQL/users')

function VerifyUser(req, res, next) {
    var cookies = {
        header: req.cookies.header,
        payload: req.cookies.payload,
        token: req.cookies.token
    }


    req.VARS.connection.query(sqlCode.verifyUser(parseToken(cookies.header, cookies.payload, cookies.token)), (err, result) => {
        if(err){
            res.status(500).send("Internal Connection Error");
        }

        if(!result[0]){
            res.status(401).send("Bad Token");
        }

        next();
    });
}

function SignUp(req, res, next) {

        req.VARS.connection.query(sqlCode.signUp(req.body.email, req.body.password, req.VARS.token), (err, result) => {
            if(err){
                res.status(500).send("Internal Connection Error");
            }

            if(err.errno == 1062) res.status(409).send("Email already used");
        });
}

function CheckCreds(req, res, next){
    req.VARS.connection.query(sqlCode.CheckCred(req.body.email, req.body.password), (err, result) => {
        if(err){
            res.status(500).send("Internal Connection Error");
        }

        if(!result[0]){ 
            res.status(401).send("Invalid Username and Password");
        }

        next();
    });
}

function UpdateJWT(req, res, next) {

    req.VARS.connection.query(sqlCode.updateJWT(req.VARS.token, req.body.email, req.body.password), (err, result) => {
        if(err){
            res.status(502).send("couldn't insert into database")
            console.log(err)
        }
        next();
    });
}

module.exports = {
    UpdateJWT,
    SignUp,
    CheckCreds,
    VerifyUser
}