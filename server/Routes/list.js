const express = require('express');
const { VerifyUser } = require('../Controllers/UserController');
const { TodoRouter } = require('./todo');
const ListRouter = express.Router();

ListRouter.post('/:list', VerifyUser);//add new list
ListRouter.get('/:list', VerifyUser);//get list data
ListRouter.delete('/:list', VerifyUser);//delete list
ListRouter.put('/:list', VerifyUser);//change list data

ListRouter.use('/:list/todo', TodoRouter);

module.exports = {
    ListRouter
}