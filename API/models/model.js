const mongoose = require('mongoose');

const sche = mongoose.Schema({
    
    Address :
    {
        type : String,
        required:true
    }
    
  
  });
  
  // making model
  
  const Coll = new mongoose.model("Dapps", sche);

  module.exports = Coll;