var mongoose = require('mongoose');

var taskSchema = {
  _id:{type:Number, required: true},
  name:{type:String, required: true},
  due:{type:DATE},
  person:{type:Number},
  tDepend:[{type:Number}],
  progress:{
    type:String,
    enum:['IDed', 'Assigned', 'Started', 'Finished'],
    default: 'IDed'//need to make this auto update when assigned
  }
};

module.exports = new mongoose.Schema(taskSchema);
module.exports.taskSchema = taskSchema;
