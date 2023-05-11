//used this as a reference https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const {authenticateUser} = require('../middleware');
const {TodoRouter} = require('./todo');
const {AccountRouter} = require('../Routes/account');

//router.use(authenticateUser);
router.all('/todo', TodoRouter);
router.use('/account', AccountRouter);
//router.all('/list', ListRouter);
//router.all('/todo', TodoROuter);


module.exports = {
    apiRouter: router
}
