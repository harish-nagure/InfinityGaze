const express = require('express')
const app = express();
const mongoose = require('mongoose')
require('./db/connection');
app.use(express.json());
app.use(require('./router/auth'));
const PORT = 8000

app.listen(PORT,()=>{
    console.log(`Server is Running at port number ${PORT}`);  
})