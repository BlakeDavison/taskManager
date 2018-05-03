var mongoose = require('mongoose');

var userSchema = {
  _id:{type:Number, required: true},
  name:{type:String, required: true},
  team:{type:Number},
  projects:[{type:Number}]
};

module.exports = new mongoose.Schema(userSchema);
module.exports.userSchema = userSchema;
