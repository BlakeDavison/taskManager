var mongoose = require('mongoose');
var User = require('./user');
var Schema = mongoose.Schema;

var taskSchema = {

  name:{type:String, required: true},
  due:{type:Date},
  user:{type:Schema.Types.ObjectId, ref:'User'},
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
