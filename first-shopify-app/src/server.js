const express =  require('express');
const app =  express();
const dotenv = require('dotenv').config();
const routes = require('../routes');
const path = require('path');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.json());

app.use(routes);


const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log("SERVER IS RUNNING ON PORT::", PORT);
});
