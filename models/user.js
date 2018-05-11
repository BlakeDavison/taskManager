var mongoose = require('mongoose');
var Project = require('./project');
var Schema = mongoose.Schema;

var userSchema = {

  name:{type:String, required: true},
  team:{type:Number},
  email:{type:String, match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, index:true},
  project:[{type:Schema.Types.ObjectId, ref:'Project'}]
};

module.exports = new mongoose.Schema(userSchema);
module.exports.userSchema = userSchema;
