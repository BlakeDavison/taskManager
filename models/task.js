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
  project:{type:Schema.Types.ObjectId, ref:'Project'},
  sprint:{type:Schema.Types.ObjectId, ref:'Sprint'},
  tDepend:[{type:Number}],
  progress:{
    type:String,
    enum:['IDed', 'Assigned', 'Started', 'Finished'],
    default: 'IDed'//need to make this auto update when assigned
  }
};
var schema =  new mongoose.Schema(taskSchema);

module.exports = schema;
module.exports.taskSchema = taskSchema;
