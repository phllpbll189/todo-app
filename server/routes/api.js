//used this as a reference https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
const express = require('express');
const router = express.Router();

//this is the format that we will take
router.all('/todo', todoRouter)


//export the router and use it in index so that we can seperate routes into different files
module.exports = {
    apiRouter: router
}
