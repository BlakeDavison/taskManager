var mongoose = require('mongoose');
var User = require('./user');
var Project = require('./project');
var Schema = mongoose.Schema;

var taskSchema = {

  name:{type:String, required: true},
  due:{type:Date},
  user:{type:Schema.Types.ObjectId, ref:'User'},
  project:{type:Schema.Types.ObjectId, ref:'Project'},
  tDepend:[{type:Number}],
  progress:{
    type:String,
    enum:['IDed', 'Assigned', 'Started', 'Passed Due', 'Finished'],
    default: 'IDed'//need to make this auto update when assigned
  }
};
var schema =  new mongoose.Schema(taskSchema);

module.exports = schema;
module.exports.taskSchema = taskSchema;
