const {parseToken} = require('../util');
const sqlCode = require('../SQL/UserSQL');
const { db } = require('./DB');

function SignUp(req, res, next) {
    
    db.query(sqlCode.signUp(req.body.email, req.body.password, req.VARS.token), (err, result) => {
        if(err){
            res.status(500).send("Internal Error");
        }

        if(err.errno == 1062) res.status(409).send("Email already used");
    });
}

function CheckCreds(req, res, next){
    
    db.query(sqlCode.Check(req.body.email, req.body.password), (err, result) => {
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

    db.query(sqlCode.updateJWT(req.VARS.token, req.body.email, req.body.password), (err, result) => {
        if(err){
            res.status(502).send("Internal Error");
            console.log(err);
        }
        next();
    });
}

module.exports = {
    UpdateJWT,
    SignUp,
    CheckCreds,
} 