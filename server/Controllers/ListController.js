const sqlCode = require('../SQL/ListSQL');
const {parseToken} = require('../util');
const { db } = require('./DB');

function GetList(req, res){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.getLists(token);
    db.query(sql, (err, result) => {
        if(err){
            res.status(500).send("There was an error retrieving your todo list");
            console.log(err);
        }
        else if(result){
            res.status(200).send(result);
        }
    })
}

function PostList(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    console.log(req.query)
    var sql = sqlCode.createList(token, req.query.name);
    
    db.query(sql, (err, result) => {
        if(err){
            res.status(500).send("Something went wrong");
            console.log(err)
        }
        else if(result){
            console.log(result)
            res.status(200).send("List Created");
        }

    })
}

function DeleteList(req, res){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.deleteList(token, req.query.list);

    db.query(sql, (err, result) => {
        if(err){
            res.status(500).send("delete error");
            console.log(err);
        }
        else if(result){
            console.log(result);
            res.status(200).send("delete success");
        } else{
            res.status(207).send("Nothing to delete");
        }
    });
}

// TODO
function UpdateList(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.updateList(req.query.name, token);
    
    db.query()
}


// TODO
function addInvite(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.addUserPermissions(token, req.body.email, req.query.list);

    db.query()
}

// TODO
function getPermissions(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.addUserPermissions(token);

    db.query()
}

// TODO
function removeUserPermissions(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.addUserPermissions(token);

    db.query()
}

// TODO
function changePermissions(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.addUserPermissions(token);

    db.query()
}

module.exports = {
    GetList,
    DeleteList,
    UpdateList,
    PostList,
    addInvite,
    getPermissions,
    removeUserPermissions,
    changePermissions
}