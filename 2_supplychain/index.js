const express = require('express');
const parser = require('body-parser')
const rout = require('./routes/rout');
const app = express();
const port = process.env.PORT || 5000;
app.use(parser.urlencoded());
app.use('/',rout);
app.listen(port,()=>{
    console.log("server is online",port);
})