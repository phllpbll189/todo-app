const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const {verifyUser} = require('./SQL/UserSQL');
const { parseToken } = require('./util');

function AppendJWT(req, res, next) {
    let secureSettings = {
        httpOnly: true,
        sameSite: true,
    };
    let tokenSplit = req.VARS.token.split(".");

    res.cookie("header", tokenSplit[0], secureSettings)
    res.cookie("token", tokenSplit[2], secureSettings)
    res.cookie("payload", tokenSplit[1], {
        ...secureSettings,
        httpOnly: false
    })

    next();
}

function CreateJWT(req, res, next) {
    const token = jwt.sign({email: req.body.email}, process.env.PRIVATEKEY);
    req.VARS = {
        ...req.VARS,
        token
    }
    next();
}

function ConnectDB(req, res, next) {
    let connection

    try {
        connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB
        });

    } catch (error) {
        res.status(501).redirect("/temp"); //make error handling function?
        next(error);
    };

    req.VARS = {
        ...req.VARS,
        "connection": connection
    };
    
    next();
}

   
module.exports = {
    AppendJWT,
    CreateJWT,
    ConnectDB
}