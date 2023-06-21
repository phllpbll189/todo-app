const express = require('express');
const TodoRouter = express.Router();

//AUTH MUST BE FINISHED FIRST  
//it will be responsible for authorizing the cookie
//and will put the users primary key in an easily accessable place in req

//then I will need to figure out how to convert path variables to JS variables
//from those variables I will be able to select specific todos
//or all todo's if an ID isn't present
//or post todos
//etc
TodoRouter.get('/:id', (req, res) => {
    res.send("hello from api/todo!")
});

module.exports = {
    TodoRouter
}