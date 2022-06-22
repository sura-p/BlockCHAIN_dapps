const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Accounts", function (err) {
    if (err)
        console.log(err);
    console.log("connection established");
});
