const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { AccountRouter } = require('./Routes/AccountRouter');

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

//react webpage route
let htmlPath  = path.resolve(__dirname+'/../front_end/build')
app.use('/',  express.static(htmlPath));

app.use('/accounts', AccountRouter);
app.use('/', (req, res) => {
    res.send("React is not set up.");
})

app.get('*', (req, res) => {
    res.redirect('/');
})