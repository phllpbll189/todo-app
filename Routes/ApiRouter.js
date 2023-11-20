const express = require('express');
const { AccountRouter } = require('./AccountRouter');
const {ListRouter} = require('./ListRouter');
const ApiRouter = express.Router();

ApiRouter.use('/account', AccountRouter);
ApiRouter.use('/lists', ListRouter);

module.exports = {
    ApiRouter
}