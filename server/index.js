const express = require('express');
const path = require('path');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const {appendCookie} = require('./middleware');
const { apiRouter } = require('./Routes/api');

const app = express();
let port;

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
    port = process.env.PORT || 8080;
}

app.listen(port, (err) => {
    if(err) console.log(err);
    console.log("App is running now");
})

app.use(express.json())
app.use(cookieParser())
//app.use((req, res, next) => {
//    console.log(req);
//    next()
//});

//react webpage route
let htmlPath  = path.resolve(__dirname+'/../front_end/build')
app.use('/',  express.static(htmlPath));
app.use((req, res, next) => {
    let connection

    try {
        connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB
        });

    } catch (error) {
        res.status(501).redirect("/temp"); //make error handling function?
        next(error);
    };

    req.VARS = {
        ...req.VARS,
        "connection": connection
    };
    
    next();
});
app.use('/api', apiRouter);
app.get('*', (req, res) => {
    res.redirect('/');
})