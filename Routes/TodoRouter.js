const express = require('express');
const TodoRouter = express.Router();
const {GetTodos, InsertTodo, UpdateTodo, deleteTodo} = require('../Controllers/TodoController');

//AUTH MUST BE FINISHED FIRST  
//it will be responsible for authorizing the cookie
//and will put the users primary key in an easily accessable place in req

//then I will need to figure out how to convert path variables to JS variables
//from those variables I will be able to select specific todos
//or all todo's if an ID isn't present
//or post todos
//etc
TodoRouter.get('/:id/', GetTodos);

TodoRouter.put('/:id', UpdateTodo)

TodoRouter.post('/:id', InsertTodo)

TodoRouter.delete('/:id', deleteTodo)

module.exports = {
    TodoRouter
}