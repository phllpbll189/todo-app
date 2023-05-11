const {parseToken} = require('../util')
const sqlCode = require('../SQL/users')

function VerifyUser(req, res, next) {
    var cookies = {
        header: req.cookies.header,
        payload: req.cookies.payload,
        token: req.cookies.token
    }


    req.VAR.connection.query(sqlCode.verifyUser(parseToken(...cookies)), (err, result) => {
        if(err){
            res.status(500).send("Internal Connection Error");
        }

        if(!result[0]){
            res.status(401).send("Bad Token");
        }

        console.log(result);
        next();
    });
}

function SignUp(req, res, next) {

        req.VARS.connection.query(sqlCode.signUp(req.body.email, req.body.password, req.VARS.token), (err, result) => {
            if(err){
                res.status(500).send("Internal Connection Error");
            }


            if(err.errno == 1062) res.status(409);
            res.send("Email already used")
        });
}

function CheckCreds(req, res, next){
    req.VARS.connection.query(sqlCode.CheckCred(req.body.email, req.body.password), (err, result) => {
        if(err){
            res.status(500).send("Internal Connection Error");
        }

        if(!result[0]){
            res.status(401).send();
        }

        next();
    });
}

function UpdateJWT(req, res, next) {

    req.VARS.connection.query(sqlCode.updateJWT(req.VARS.token, req.body.email, req.body.password), (err, result) => {
        if(!err){
            next();
        } else {
            console.log(err)
        }
    });
}

module.exports = {
    UpdateJWT,
    SignUp,
    CheckCreds,
    VerifyUser
}