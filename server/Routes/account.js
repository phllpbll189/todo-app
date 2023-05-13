/*Handle accounts here,
Signin
Signup
Invite other users*/

const express = require('express');
const AccountRouter = express.Router();
const {CheckCreds, UpdateJWT, SignUp} = require('../Controllers/UserController');
const { AppendJWT, CreateJWT } = require('../middleware');

//todo
AccountRouter.post('/signup', CreateJWT, SignUp, AppendJWT, (req, res) => {
    res.status(201).send("Profile Created")
});

AccountRouter.post('/signin', CheckCreds, CreateJWT, UpdateJWT, AppendJWT, (req, res) => {
    res.status(200).send("Authorized");
})

module.exports = {
    AccountRouter
}