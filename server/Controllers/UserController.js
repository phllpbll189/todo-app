const {parseToken} = require('../util')
const sqlCode = require('../SQL/UserSQL')
   
function VerifyUser(req, res, next) {

    var cookies = {
        header: req.cookies.header,
        payload: req.cookies.payload,
        token: req.cookies.token
    }


    req.VARS.connection.query(sqlCode.verifyUser(parseToken(cookies.header, cookies.payload, cookies.token)), (err, result) => {
        if(err){
            res.status(500).send("Internal Error");
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
            res.status(500).send("Internal Error");
        }

        if(err.errno == 1062) res.status(409).send("Email already used");
    });
}

function CheckCreds(req, res, next){

    req.VARS.connection.query(sqlCode.CheckCred(req.body.email, req.body.password), (err, result) => {
        if(err){
            res.status(500).send("Internal Error");
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
            res.status(502).send("Internal Error");
            console.log(err);
        }
        next();
    });
}

function VerifyOwner(req, res, next) {
    req.VARS.connection.query(sqlCode.IsOwner(
        req.cookies.payload.email, 
        parseToken(req.cookies.header, req.cookies.payload, req.cookies.token),
        req.params.list
    ), (err, result) => {
        if(err){
            res.status(500).send("Internal Error");
        }
        if(result[0] != 1){
            res.status(403).send("Forbidden");
        }
        next()
    })
}

function VerifyAccess(req, res, next) {
    req.VARS.connection.query(sqlCode.HasAccess(
            req.cookies.payload.email, 
            parseToken(req.cookies.header, req.cookies.payload, req.cookies.token),
            req.params.list
        ), (err, result) => {

        if(err){
            res.status(500).send("Internal Error");
        }
        if(!result[0]){
            res.status(403).send("Forbidden");
        }
        next()
    })
}
module.exports = {
    UpdateJWT,
    SignUp,
    CheckCreds,
    VerifyUser,
    VerifyOwner,
    VerifyAccess 
};