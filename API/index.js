const express = require('express');
const parser = require('body-parser');
const rout = require('./routes/routes.js');
const app = express();
port = process.env.PORT || 5010;
app.use(parser.urlencoded());
 app.use('/',rout.router);

 app.listen(port,()=>{
    console.log("server is online",port);
})
