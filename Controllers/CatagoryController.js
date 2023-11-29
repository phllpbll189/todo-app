const {parseToken} = require("../util");
const sqlCode = require("../SQL/CatagorySQL");
const {db} = require('./DB');

function GetCatagories(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.getCatagories(token, req.params.id);

    db.query(sql, (err, result) => {
        if(err){
            res.sendStatus(500);
            console.log(err);
        } else if(result){
            res.status(200).send(result);
        }
    })
}

function InsertCat(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.insertCat(token, req.params.id, req.body);

    db.query(sql, (err, result) => {
        if(err){
            res.sendStatus(500);
            console.log(err)
        } else if(result){
            res.sendStatus(204);
        }
    })
}


function UpdateCat(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.updateCat(token, req.params.id, req.body);

    db.query(sql, (err, result) => {
        if(err){
            res.sendStatus(500);
            console.log(err)
        } else if(result){
            res.sendStatus(204);
        }
    })
}

function DeleteCat(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.deleteCat(token, req.params.id, req.body);

    db.query(sql, (err, result) => {
        if(err){
            res.sendStatus(500);
            console.log(err)
        } else if(result){
            res.sendStatus(204);
        }
    })
}
module.exports = {
    GetCatagories,
    InsertCat,
    UpdateCat,
    DeleteCat
}