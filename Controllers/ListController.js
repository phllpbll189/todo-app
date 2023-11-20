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
        } else {
            res.status(204).send();
        }
    });
}

function UpdateList(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.updateList(token, req.body.lid, req.body.name);
    
    db.query(sql, (err, result) => {
        if(err){
            res.status(500).send("Update Error");
            console.log(err);
        } else {
            res.status(204).send();
        }
    })
}



function addInvite(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.addUserPermissions(token, req.body.email, req.body.lid, req.body.canWrite);

    db.query(sql, (err, result) => {
        if(err){
            res.status(500).send("Error Adding Invite");
            console.log(err);
        } else {
            res.sendStatus(204);
        }
    })
}

function getPermissions(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.getPermissions(req.params.lid, token);
    db.query(sql, (err, result) => {
        if(err){
            res.status(500).send("Error Retrieving Data");
            console.log(err);
        } else {
            res.status(200).send(result[0]);
        }
    })
}

function removeUserPermissions(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.removeUserPermissions(token, req.body.email, req.body.lid);

    db.query(sql, (err, result) => {
        if(err){
            res.status(500).send("Error in Deletion");
            console.log(err);
        } else {
            res.sendStatus(204);
        }
    })
}

// TODO
function changePermissions(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.changePermissions(token, req.body.email, req.body.lid, req.body.canWrite);

    db.query(sql, (err, result) => {
        if(err){
            res.status(500).send("Error in Update");
            console.log(err);
        } else {
            res.sendStatus(204);
        }
    })
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