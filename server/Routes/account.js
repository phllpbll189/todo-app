/*Handle accounts here,
Signin
Signup
Invite other users*/

const express = require('express');
const AccountRouter = express.Router();
const {CheckCreds, UpdateJWT, SignUp} = require('../Controllers/UserController');
const { AppendJWT, CreateJWT } = require('../middleware');
const { ListRouter } = require('./list');

//todo
AccountRouter.post('/signup', CreateJWT, SignUp, AppendJWT, (req, res) => {
    res.status(201).send("Profile Created")
});

AccountRouter.post('/login', CheckCreds, CreateJWT, UpdateJWT, AppendJWT, (req, res) => {
    res.status(200).send("Authorized");
})

AccountRouter.use('/list', ListRouter);

module.exports = {
    AccountRouter
}