const express = require('express');
const path = require('path');
const {appendCookie} = require('./middleware');

const app = express();
const PORT = 8000;

//login if not logged in
//redirect to todo page and send profile data
//they are logged in if they send a valid JWT

app.listen(PORT, (err) => {
    if(err) console.log(err);
    console.log("App is running now");
})

let htmlPath  = path.resolve(__dirname+'/../front_end/build')
app.use(appendCookie);
app.use(express.static(htmlPath));