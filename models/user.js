var mongoose = require('mongoose');
//creates the schema for validation for the category collection
var userSchema = {
  _id:{type:Number, required:true},
  username: {
    type: String,
    required: true
  },
  team:{
    type: Number
  }
};

module.exports = new mongoose.Schema(userSchema);
module.exports.userSchema = userSchema;
