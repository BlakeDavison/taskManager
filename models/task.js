const mongoose = require('mongoose');
const User = require('./user');
const Sprint = require('./sprint');
const Project = require('./project');
const Schema = mongoose.Schema;

var taskSchema = {
  _id:Schema.Types.ObjectId,
  name:{type:String, required: true},
  due:{type:Date},
  user:{type:Schema.Types.ObjectId, ref:'User', index:true},
  project:{type:Schema.Types.ObjectId, ref:'Project', default:"000000000000000000000001"},
  sprint:{type:Schema.Types.ObjectId, ref:'Sprint', default:"000000000000000000000001"},
  tDepend:[{type:Schema.Types.ObjectId}],
  important:{type:Boolean, default:false},
  complete:{type:Boolean, default:false}
};
var schema =  new mongoose.Schema(taskSchema);

module.exports = schema;
module.exports.taskSchema = taskSchema;
