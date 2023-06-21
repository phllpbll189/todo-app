const express = require('express');
const { TodoRouter } = require('./ListRoutes/TodoRouter');
const { GetList, DeleteList, UpdateList, PostList, addInvite, getPermissions, removeUserPermissions, changePermissions} = require('../../Controllers/ListController');
const ListRouter = express.Router();

//ListRouter.use('/categories' CatagoryRouter);
ListRouter.use('/todos', TodoRouter);

ListRouter.post('/permissions/:list', addInvite);
ListRouter.get('/permissions/:list', getPermissions);
ListRouter.delete('/permissions/:list', removeUserPermissions);
ListRouter.put('/permissions/:list', changePermissions);

ListRouter.get('/', GetList);
ListRouter.post('/', PostList);
ListRouter.delete('/', DeleteList);
ListRouter.put('/', UpdateList);

module.exports = {
    ListRouter
}