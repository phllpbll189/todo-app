const { parseToken } = require("../util");
const sqlCode = require("../SQL/TodoSQL");
const {db} = require('./DB');

function GetTodos(req, res, next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var sql = sqlCode.getTodos(token, req.params.id);

    db.query(sql, (err, result) => {
        if(err){
            res.sendStatus(500)
            console.log(err);
        } else if(result){
            res.status(200).send(result);
        }
    })
}

function InsertTodo(req,res,next){
    var token = parseToken(req.cookies.header, req.cookies.payload, req.cookies.token);
    var content = JSON.stringify(req.body.Content)
    var sql = sqlCode.insertTodo(token, req.params.id, req.body.Title, req.body.X, req.body.Y, content, req.body.StartDate, req.body.EndDate);

    db.query(sql, (err, result) => {
        if(err){
            res.sendStatus(500);
            console.log(err);
        } else if(result){
            res.status(204).send();
        }
    })
}

module.exports = {
    GetTodos,
    InsertTodo
};