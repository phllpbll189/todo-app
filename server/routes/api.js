//used this as a reference https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const {authenticateUser} = require('../middleware');
const {TodoRouter} = require('./todo');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
})

//router.use(authenticateUser);
router.use((req, res, next) => {
    req.VARS = {
        ...req.VARS,
        connection: connection
    };
    next();
});
router.all('/todo', TodoRouter);


//export the router and use it in index so that we can seperate routes into different files
module.exports = {
    apiRouter: router
}
