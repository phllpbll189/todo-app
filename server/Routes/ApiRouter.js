//used this as a reference https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const {authenticateUser} = require('../middleware');
const {TodoRouter} = require('./TodoRouter');
const {AccountRouter} = require('./AccountRouter');

//router.use(authenticateUser);
router.use('/account', AccountRouter);
//router.all('/list', ListRouter);
//router.use('/todo', TodoRouter);


module.exports = {
    apiRouter: router
}
