const express = require('express');
const {VerifyUser, VerifyAccess, VerifyOwner} = require('../Controllers/UserController');
const { TodoRouter } = require('./TodoRouter');
const { GetList, DeleteList, UpdateList, PostList, addInvite, getPermissions, removeUserPermissions, changePermissions} = require('../Controllers/ListController');
const ListRouter = express.Router();

ListRouter.get('/', GetList);
ListRouter.post('/:list', PostList);//add new list to the email provided in the cookie
ListRouter.delete('/:list', DeleteList);
ListRouter.put('/:list', UpdateList);

ListRouter.post('/:list/permissions', addInvite);
ListRouter.get('/:list/permissions', getPermissions);
ListRouter.delete('/:list/permissions', removeUserPermissions);
ListRouter.put('/:list/permissions', changePermissions);

ListRouter.use('/:list/todos', VerifyAccess, TodoRouter);
//ListRouter.use('/:list/categories' CatagoryRouter);

module.exports = {
    ListRouter
}