const mongoose = require('mongoose');
const Project = require('./project');
const Schema = mongoose.Schema;

var userSchema = {
  _id:Schema.Types.ObjectId,
  name:{type:String, required: true, unique:true},
  password:{type:String, required: true},
  team:{type:Number},
  email:{type:String, match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, index:true},
  projects:[{type:Schema.Types.ObjectId, ref:'Project'}]
};

module.exports = new mongoose.Schema(userSchema);
module.exports.userSchema = userSchema;
