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
            console.log(result);
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
        }
        else if(result.affectedRows == 0){
            console.log(result);
            res.status(404).send("resource not deleted");
        } else{
            res.status(204);
        }
    });
}

// TODO
function UpdateList(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.updateList(req.query.lid, req.body.name, token);
    
    db.query(sql, (err, result) => {
        if(err){
            res.status(500).send("Update Error");
            console.log(err);
        }
        else if(result.affectedRows == 0){
            console.log(result);
            res.status(404).send("Resource Unchanged");
        } else {
            res.status(204);
        }
    })
}


// TODO
function addInvite(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.addUserPermissions(token, req.body.email, req.params.list, req.body.canWrite);
    
    db.query(sql, (err, result) => {
        if(err){
            res.status(500).send("Insert Error");
            console.error(err);
        }
        else{
            console.log(result);
            res.status(201).send("added Resource");
        }
    })
}

// TODO
function getPermissions(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.getPermissions(req.params.list, token);

    db.query(sql, (err, result) => {
        if(err){
            res.status(500).send("Error Retrieving permissions");
            console.error(err);
        }
        else{
            console.log(result);
            res.status(202).send(result);
        }
    })
}

// TODO
function removeUserPermissions(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.deletePermissions(token, req.body.email, req.params.list);

    db.query(sql, (err, result) => {
        if(err){
            res.status(500).send("Delete Error");
            console.error(err);
        } else if(result.affectedRows == 0){
            console.log(result);
            res.status(404).send("resource not found");
        } else {
            console.log(result);
            res.status(202).send("delete Successful");
        }
    })
}

// TODO
function changePermissions(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.changePermissions(token, req.body.email, req.params.list, req.body.canWrite);

    db.query(sql, (err, res) => {
        if(err){
            console.error(err);
            res.status(500).send("update error");
        } else if(result.affectedRows == 0){
            console.log(result);
            res.status(404).send("resource not changed");
        } else {
            console.log(result);
            res.status(202).send("change successful")
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