const express = require('express');
const jwt = require('jsonwebtoken');
const { request } = require('http');
const https = require('https');

const app = express();
const PORT = 8000;

//login if not logged in
//redirect to todo page and send profile data
//they are logged in if they send a valid JWT

app.listen(PORT, (err) => {
    if(err) console.log(err);
    console.log("App is running now");
})

app.use(AppendCookie)

app.get('/', (req, res) => {
    console.log(req);
    res.send("helloworld");
})

function AppendCookie(req, res, next) {
    const token = jwt.sign({email: "Phllpbll@fuck.com"}, 'insertabetterkeyhere');
    res.cookie("access_token", token, {
        httpOnly: true,
        secure: "production",
    }).status(200)
    .json({message: "logged in successfully"})

    next();
}