const mongoose = require('mongoose');

const sche = mongoose.Schema({
    Email_ID :
    {
        type : String,
        required:true
    },
    Password :
    {
        type : String,
        required:true
    }
  
  });
  
  // making model
  
  const Coll = new mongoose.model("Dapps", sche);

  module.exports = Coll;