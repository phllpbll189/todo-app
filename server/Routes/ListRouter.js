const express = require('express');
const {VerifyUser, VerifyAccess, VerifyOwner} = require('../Controllers/UserController');
const { TodoRouter } = require('./TodoRouter');
const ListRouter = express.Router();

ListRouter.get('/', VerifyUser);
ListRouter.post('/:list', VerifyUser);//add new list to the email provided in the cookie
ListRouter.delete('/:list', VerifyOwner );
ListRouter.put('/:list', VerifyOwner);

ListRouter.post('/:list/permissions', VerifyOwner);
ListRouter.get('/:list/permissions', VerifyOwner);
ListRouter.delete('/:list/permissions', VerifyOwner);
ListRouter.put('/:list/permissions', VerifyOwner);

ListRouter.use('/:list/todos', VerifyAccess, TodoRouter);
//ListRouter.use('/:list/categories' CatagoryRouter);

module.exports = {
    ListRouter
}