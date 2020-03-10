const express =  require('express');
const app =  express();
const dotenv = require('dotenv').config();
const routes = require('../routes');


app.use(express.json());

app.use(routes);


const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log("SERVER IS RUNNING ON PORT::", PORT);
});
