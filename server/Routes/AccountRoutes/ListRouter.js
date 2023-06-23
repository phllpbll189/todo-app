const express = require('express');
const { TodoRouter } = require('./ListRoutes/TodoRouter');
const { GetList, DeleteList, UpdateList, PostList, addInvite, getPermissions, removeUserPermissions, changePermissions} = require('../../Controllers/ListController');
const ListRouter = express.Router();

//ListRouter.use('/categories' CatagoryRouter);
ListRouter.use('/todos', TodoRouter);

ListRouter.post('/permissions/', addInvite);
ListRouter.get('/permissions/', getPermissions);
ListRouter.delete('/permissions/', removeUserPermissions);
ListRouter.put('/permissions/', changePermissions);

ListRouter.get('/', GetList);
ListRouter.post('/', PostList);
ListRouter.delete('/', DeleteList);
ListRouter.put('/', UpdateList);

module.exports = {
    ListRouter
}