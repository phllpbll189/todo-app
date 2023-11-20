const express = require('express');
const { TodoRouter } = require('./TodoRouter');
const {CatagoryRouter } = require('./CatagoryRouter');
const { GetList, DeleteList, UpdateList, PostList, addInvite, getPermissions, removeUserPermissions, changePermissions} = require('../Controllers/ListController');
const ListRouter = express.Router();

ListRouter.use('/todos', TodoRouter);
ListRouter.use('/catagory', CatagoryRouter);

ListRouter.post('/permissions/', addInvite);
ListRouter.get('/permissions/:lid', getPermissions);
ListRouter.delete('/permissions/', removeUserPermissions);
ListRouter.put('/permissions/', changePermissions);

ListRouter.get('/', GetList);
ListRouter.post('/', PostList);
ListRouter.delete('/', DeleteList);
ListRouter.put('/', UpdateList);

module.exports = {
    ListRouter
}